<<<<<<< HEAD
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
=======
import { log, World } from "@rbxts/matter";
import { Effect } from "shared/components";
import remotes from "shared/remotes";

const remoteEvent = remotes.Server.Get("CreateFx");

export function emitEffects(world: World): void {
	remoteEvent.Connect((_, effect) => {
		world.spawn(Effect(effect));
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
	});
}
