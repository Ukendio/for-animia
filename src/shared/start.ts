import { Debugger, Loop, World, AnySystem } from "@rbxts/matter";
import { RunService, UserInputService } from "@rbxts/services";
import { HotReloader } from "@rbxts/rewire";
import Plasma from "@rbxts/plasma";
import type { ClientState } from "client/index.client";
//import { ChickynoidClient, ChickynoidServer } from "./chickynoid/types";

export function start<T extends object>(container: Instance, state: T): World {
	const world = new World();

	const myDebugger = new Debugger(Plasma);
	myDebugger.authorize = (player): boolean => {
		const condition = player.UserId === 97718174;
		if (!condition) player.Kick("Nice try kid 😂");

		return condition;
	};
	const loop = new Loop(world, state, myDebugger.getWidgets());

	const hotReloader = new HotReloader();

	let firstRunSystems = new Array<AnySystem>();
	let systemsByModule = new Map<ModuleScript, AnySystem>();

	hotReloader.scan(
		container,
		(mod, ctx) => {
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
		},
		(_, ctx) => {
			if (ctx.isReloading) return;

			const originalModule = ctx.originalModule;
			if (systemsByModule.has(originalModule)) {
				loop.evictSystem(systemsByModule.get(originalModule)!);
				systemsByModule.delete(originalModule);
			}
		},
	);

	loop.scheduleSystems(firstRunSystems);
	firstRunSystems = undefined!;

	myDebugger.autoInitialize(loop);

	loop.begin({
		default: RunService.Heartbeat,
	});

	//let chickynoid: typeof ChickynoidClient | typeof ChickynoidServer = ChickynoidClient;
	if (RunService.IsClient()) {
		UserInputService.InputBegan.Connect((input) => {
			if (input.KeyCode === Enum.KeyCode.F4) {
				myDebugger.toggle();
				(state as unknown as ClientState).debugEnabled = myDebugger.enabled;
			}
		});
	} else {
		//chickynoid = ChickynoidServer;
		//chickynoid.RecreateCollisions(Workspace);
	}

	//(chickynoid as typeof ChickynoidClient & typeof ChickynoidServer).Setup();

	return world;
}
