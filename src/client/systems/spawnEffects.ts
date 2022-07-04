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
			world.despawn(id);
			continue;
		}

		predictionGUIDBuffer.add(effect.predictionGUID);

		replicate_fx_on_client(world, effect);

		if (effect.source === Players.LocalPlayer) {
			remoteEvent.SendToServer(effect);
		}
	}

	if (useThrottle(2)) {
		predictionGUIDBuffer.clear();
	}
}

export = spawnEffects;
