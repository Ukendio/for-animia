<<<<<<< HEAD
import { log, useThrottle, World } from "@rbxts/matter";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { Effect } from "shared/components";
import { replicate_fx_on_client } from "shared/effects/replicate_fx_on_client";
import { ClientState } from "shared/clientState";

const remoteEvent = ReplicatedStorage.WaitForChild("CreateFX") as RemoteEvent;

const predictionGUIDBuffer = new Set<string>();

function spawnEffects(world: World, state: ClientState): void {
	for (let [id, effect] of world.query(Effect)) {
		const predictionGUID = effect.predictionGUID;

		if (predictionGUID === undefined) {
=======
import { useThrottle, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Effect } from "shared/components";
import { replicate_fx_on_client } from "shared/effects/replicate_fx_on_client";
import remotes from "shared/remotes";

const remoteEvent = remotes.Client.Get("CreateFx");

const predictionGUIDBuffer = new Set<string>();

function spawnEffects(world: World): void {
	for (let [id, effect] of world.query(Effect)) {
		if (predictionGUIDBuffer.has(effect.predictionGUID)) {
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
			world.despawn(id);
			continue;
		}

<<<<<<< HEAD
		if (predictionGUIDBuffer.has(predictionGUID)) {
			world.despawn(id);
			continue;
		}

		predictionGUIDBuffer.add(predictionGUID);
=======
		predictionGUIDBuffer.add(effect.predictionGUID);
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a

		replicate_fx_on_client(world, effect);

		if (effect.source === Players.LocalPlayer) {
<<<<<<< HEAD
			remoteEvent.FireServer(effect);
=======
			remoteEvent.SendToServer(effect);
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		}
	}

	if (useThrottle(2)) {
		predictionGUIDBuffer.clear();
	}
}

export = {
	event: "fixed",
	system: spawnEffects,
};
