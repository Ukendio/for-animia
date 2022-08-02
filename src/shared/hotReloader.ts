import { CollectionService, RunService } from "@rbxts/services";

export class HotReloader {
	public constructor(
		private listeners = new Array<RBXScriptConnection>(),
		private clonedModules = new Map<ModuleScript, ModuleScript>(),
	) {}

	public destroy(): void {
		this.listeners.forEach((listener) => listener.Disconnect());
		this.listeners = [];

		this.clonedModules.forEach((cloned) => cloned.Destroy());
		this.clonedModules = new Map();
	}

	public listen(module: ModuleScript, fn: (mod: ModuleScript) => void, cleanup: (mod: ModuleScript) => void): void {
		if (RunService.IsStudio()) {
			const module_changed = (module as ChangedSignal).Changed.Connect(() => {
				const mod = this.clonedModules.get(module);

				if (mod) {
					cleanup(mod);
					mod.Destroy();
				} else {
					cleanup(module);
				}

				const cloned = module.Clone();

				CollectionService.AddTag(cloned, "RewireClonedModule");

				cloned.Parent = module.Parent;
				this.clonedModules.set(module, cloned);

				fn(cloned);

				warn(`HotReloaded ${module.GetFullName()}!`);
			});

			this.listeners.push(module_changed);
		}

		fn(module);
	}
}
