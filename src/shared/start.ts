import { Debugger, Loop, World, AnySystem, AnyEntity } from "@rbxts/matter";
import { Players, RunService, UserInputService } from "@rbxts/services";
import { Context, HotReloader } from "@rbxts/rewire";
import Plasma from "@rbxts/plasma";
import type { ClientState } from "client/game.client";
//import { ChickynoidClient, ChickynoidServer } from "./chickynoid/types";
import { Renderable } from "./components";

export function start<S extends object>(containers: Array<Instance>, state: S): LuaTuple<[World, S]> {
	const world = new World();

	const myDebugger = new Debugger(Plasma);

	myDebugger.findInstanceFromEntity = (id): Model | undefined => {
		if (!world.contains(id)) return;

		const model = world.get(id, Renderable);

		return model ? model.model : undefined;
	};

	myDebugger.authorize = (player): boolean => {
		return player.UserId === 97718174;
	};

	const loop = new Loop(world, state, myDebugger.getWidgets());

	const hotReloader = new HotReloader();

	let firstRunSystems = new Array<AnySystem>();
	let systemsByModule = new Map<ModuleScript, AnySystem>();

	function loadModule(mod: ModuleScript, ctx: Context): void {
		const originalModule = ctx.originalModule;

		const [ok, system] = pcall(require, mod) as LuaTuple<[boolean, AnySystem]>;

		if (!ok) {
			warn("Error when hot-reloading system", mod.Name, system);
			return;
		}

		if (firstRunSystems) {
			firstRunSystems.push(system as AnySystem);
		} else if (systemsByModule.has(originalModule)) {
			loop.replaceSystem(systemsByModule.get(originalModule)!, system);
			myDebugger.replaceSystem(systemsByModule.get(originalModule)!, system);
		} else loop.scheduleSystem(system);

		systemsByModule.set(originalModule, system);
	}

	function unloadModule(_: ModuleScript, ctx: Context): void {
		if (ctx.isReloading) return;

		const originalModule = ctx.originalModule;
		if (systemsByModule.has(originalModule)) {
			loop.evictSystem(systemsByModule.get(originalModule)!);
			systemsByModule.delete(originalModule);
		}
	}

	containers.forEach((container) => hotReloader.scan(container, loadModule, unloadModule));

	loop.scheduleSystems(firstRunSystems);
	firstRunSystems = undefined!;

	myDebugger.autoInitialize(loop);

	loop.begin({
		default: RunService.IsClient() ? RunService.RenderStepped : RunService.Heartbeat,
		fixed: RunService.Heartbeat,
	});

	//let chickynoid: typeof ChickynoidClient | typeof ChickynoidServer = ChickynoidClient;
	if (RunService.IsClient()) {
		UserInputService.InputBegan.Connect((input) => {
			if (input.KeyCode === Enum.KeyCode.F4) {
				myDebugger.toggle();
				(state as ClientState).debugEnabled = myDebugger.enabled;
			}
		});
	} else {
		//chickynoid = ChickynoidServer;
		//chickynoid.RecreateCollisions(Workspace);
	}

	//(chickynoid as typeof ChickynoidClient & typeof ChickynoidServer).Setup();

	return $tuple(world, state);
}
