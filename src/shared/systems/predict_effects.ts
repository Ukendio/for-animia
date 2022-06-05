import { AnyEntity, World } from "@rbxts/matter";
import { CombatStats, Effect, Replicate } from "shared/components";
import { replicate_fx_on_client } from "shared/effects/replicate_fx_on_client";

function system(world: World): void {
	for (const [id, effect] of world.query(Effect).without(Replicate)) {
		const player_id = effect.creator.unwrap().GetAttribute("entity_id") as AnyEntity;

		const combat_stats = world.get(player_id, CombatStats);

		if (combat_stats && combat_stats) continue;

		replicate_fx_on_client(world, effect);

		world.insert(id, Replicate());
	}
}

export const predict_effects = {
	priority: 100,
	system,
};
