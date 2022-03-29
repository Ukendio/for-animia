import { World } from "@rbxts/matter";
import { Effect, Replicate } from "shared/components";
import { replicate_fx_on_client } from "shared/effects_db/replicate_fx_on_client";

export const spawn_effects = {
	priority: 100,
	system: (world: World): void => {
		for (const [id, effect] of world.query(Effect).without(Replicate)) {
			let should_predict = true;
			if (effect.variant.type === "Damage") {
				should_predict = false;
			}

			world.insert(id, Replicate({ should_predict }));

			if (should_predict) {
				replicate_fx_on_client(world, effect);
			}
		}
	},
};
