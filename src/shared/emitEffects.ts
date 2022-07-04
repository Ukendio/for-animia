import { World } from "@rbxts/matter";
import { Effect } from "shared/components";
import remotes from "shared/remotes";

const remoteEvent = remotes.Server.Get("CreateFx");

export function emitEffects(world: World): void {
	remoteEvent.Connect((_, effect) => {
		world.spawn(Effect(effect));
	});
}
