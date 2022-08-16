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
			world.despawn(id);
			continue;
		}

		if (predictionGUIDBuffer.has(predictionGUID)) {
			world.despawn(id);
			continue;
		}

		predictionGUIDBuffer.add(predictionGUID);

		replicate_fx_on_client(world, effect);

		if (effect.source === Players.LocalPlayer) {
			remoteEvent.FireServer(effect);
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
