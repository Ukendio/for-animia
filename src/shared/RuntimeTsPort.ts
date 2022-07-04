const stack = new Array<SparkStackFrame>();

type SparkNode = {
	instance?: Instance;
	children?: Map<string, SparkNode>;
	generation?: string;
	effects?: Map<
		string,
		{
			lastDependencies?: Array<unknown>;
			lastDependenciesLength: number;
			destructor?: () => void;
		}
	>;
};

type SparkStackFrame = {
	node: SparkNode;
	discriminator?: unknown;
	childCounts?: Map<string, number>;
};

function newNode(state = {}): SparkNode {
	return {};
}

function destroyNode(node: SparkNode): void {
	if (node.instance !== undefined) {
		node.instance.Destroy();
	}

	for (const [, effect] of node.effects!) {
		if (effect.destructor !== undefined) {
			effect.destructor();
		}
	}

	for (const [, child] of node.children!) {
		destroyNode(child);
	}
}

function newStackFrame(node: SparkNode): SparkStackFrame {
	return {
		node,
	};
}

function scope<T extends Array<unknown>>(level: number, scopeKey: string, fn: (...args: T) => void, ...args: T): void {
	const parentFrame = stack[stack.size() - 1];
	const parentNode = parentFrame.node;

	const [file] = debug.info(1 + level, "s");
	const [line] = debug.info(1 + level, "l");
	const baseKey = string.format("%s:%s:%s%d", scopeKey, tostring(parentFrame.discriminator) ?? "", file, line);

	parentFrame.childCounts?.set(baseKey, (parentFrame.childCounts?.get(baseKey) ?? 0) + 1);
	const key = string.format("%s:%d", baseKey, parentFrame.childCounts!.get(baseKey)!);

	let currentNode = parentNode.children?.get(key);

	if (currentNode === undefined) {
		currentNode = newNode();
		parentNode.children?.set(key, currentNode);
	}

	currentNode.generation = parentNode.generation;

	stack.push(newStackFrame(currentNode));
	const [success, handle] = xpcall(fn, debug.traceback as never, ...args) as LuaTuple<[boolean, void]>;

	if (!success) {
		error();
	}

	stack.remove(stack.size());

	for (const [childKey, childNode] of currentNode.children!) {
		if (childNode.generation !== currentNode.generation) {
			destroyNode(childNode);
			currentNode.children?.delete(childKey);
		}
	}

	return handle;
}

export class Runtime {
	public static default(rootInstance: Instance): SparkNode {
		const node = newNode();
		node.instance = rootInstance;
		return node;
	}

	public static start<T extends Array<unknown>>(rootNode: SparkNode, fn: (...args: T) => void, ...args: T): void {
		if (stack.size() > 0) {
			error("LightningSparks.start cannot be called while Lightning.start is already running", 2);
		}

		const handler = (...args: T): void => {
			const thread = coroutine.running();

			task.defer(() => {
				if (coroutine.status(thread) !== "dead") {
					task.spawn(error, "Handler passed to LightningSparks.start yielded");
				}
			});

			return fn(...args);
		};

		stack[0] = newStackFrame(rootNode);
		scope(2, "root", handler, ...args);
		stack.remove(stack.size());

		for (const [childKey, childNode] of rootNode.children!) {
			if (childNode.generation !== rootNode.generation) {
				destroyNode(childNode);
				rootNode.children?.delete(childKey);
			}
		}
	}

	public static widget<T extends Array<unknown>>(fn: (...args: T) => void): (...args: T) => void {
		const [file, line] = debug.info(2, "sl");
		const scopeKey = string.format("%s+%d", file, line);

		return (...args: T): void => scope(2, scopeKey, fn, ...args);
	}

	public useInstance(creator: () => Instance): void {
		const node = stack[stack.size() - 1].node;
	}

	public static spark(maxCountSparks: number): void {}
}
