import { useHookState } from "@rbxts/matter";
import { InferSignalParameters } from "@rbxts/matter/lib/hooks/useEvent";
import { Queue } from "shared/queue";

interface ConnectionData<T> {
	connection: RBXScriptConnection;
	queue: Queue<InferSignalParameters<T>>;
}
function cleanup<T>(data: ConnectionData<T>): void {
	data.connection.Disconnect();
	table.clear(data);
}

interface State<I extends Instance, E extends InstanceEventNames<I>> {
	connections: Map<I, ConnectionData<InstanceEvents<I>[E]>>;
}

function to_set<T>(list: Array<T>): Set<T> {
	const t = new Set<T>();

	list.forEach((instance) => t.add(instance));

	return t;
}

export function use_batched_event<T extends Instance, E extends InstanceEventNames<T>>(
	instances: Array<T>,
	event: InstanceEvents<T>[E],
): IterableFunction<LuaTuple<[index: Instance, ...rest: InferSignalParameters<InstanceEvents<T>[E]>]>> {
	const instances_set = to_set(instances);

	const storage = useHookState<State<T, E>>(event, (state) => {
		state.connections.forEach((data) => {
			cleanup(data);
		});
	});

	if (!storage.connections) {
		storage.connections = new Map();
	}

	storage.connections.forEach((data, instance) => {
		if (!instances_set.has(instance)) cleanup(data);

		storage.connections.delete(instance);
	});

	instances.forEach((instance) => {
		if (!storage.connections.has(instance)) {
			const data = {} as ConnectionData<InstanceEvents<T>[E]>;
			const queue = new Queue<InferSignalParameters<InstanceEvents<T>[E]>>();
			data.queue = queue;
		}
	});

	let [current_instance, current_data] = next(storage.connections, undefined);

	return function () {
		let args: InferSignalParameters<InstanceEvents<T>[E]> | undefined = undefined;

		while (current_instance !== undefined && current_data !== undefined) {
			args = current_data.queue.popFront();

			if (args !== undefined) {
				[current_instance, current_data] = next(storage.connections, current_instance);
			}

			if (args) {
				return [current_instance, ...args] as unknown as LuaTuple<
					[idx: Instance, ...rest: InferSignalParameters<InstanceEvents<T>[E]>]
				>;
			}
		}
	} as IterableFunction<LuaTuple<[idx: Instance, ...rest: InferSignalParameters<InstanceEvents<T>[E]>]>>;
}
