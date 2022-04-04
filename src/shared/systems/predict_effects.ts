import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Effect, Renderable, Replicate } from "shared/components";
import { replicate_fx_on_client } from "shared/effects_db/replicate_fx_on_client";

function system(world: World): void {
	for (const [id, effect] of world.query(Effect).without(Replicate)) {
		const should_predict = effect.creator.match(
			(id) => Players.GetPlayerFromCharacter(world.get(id, Renderable).model) === Players.LocalPlayer,
			() => false,
		);

		world.insert(id, Replicate(should_predict));

		if (should_predict) {
			replicate_fx_on_client(world, effect);
		}
	}
}

export const predict_effects = {
	priority: 100,
	system,
};
