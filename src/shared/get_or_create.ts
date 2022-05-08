export function get_or_create<T extends keyof CreatableInstances>(
	parent: Instance,
	name: string,
	class_name: T,
): CreatableInstances[T] {
	let instance = parent.FindFirstChild(name) as CreatableInstances[T];

	if (!instance) {
		instance = new Instance(class_name);
		instance.Name = name;
		instance.Parent = parent;
	}

	return instance;
}
