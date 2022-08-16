import { World } from "@rbxts/matter";
import { ReplicatedStorage } from "@rbxts/services";
import { Effect } from "shared/components";
import { EffectPayload } from "shared/effects";

const remoteEvent = new Instance("RemoteEvent");
remoteEvent.Name = "CreateFX";
remoteEvent.Parent = ReplicatedStorage;

export function emitEffects(world: World): void {
	remoteEvent.OnServerEvent.Connect((_, effect) => {
		world.spawn(Effect(effect as EffectPayload));
	});
}
