import { World } from "@rbxts/matter";
import { match, __ } from "@rbxts/rbxts-pattern";
import { Effect, Renderable, SufferDamage, Velocity } from "shared/components";
import { EffectType, EffectTypeInfo } from "shared/effects_db";

export function spawn_effects(world: World): void {
	for (const [id, { creator, effect_type, effect_payload, target }] of world.query(Effect).without(Renderable)) {
		match(effect_type)
			.with(EffectType.Damage, (payload) => {
				const { damage } = effect_payload as EffectTypeInfo[typeof payload];

				target.map((target) => {
					world.insert(target, SufferDamage({ damage, source: creator }));
					world.despawn(id);
				});
			})

			.with(EffectType.KnockBack, (payload) => {
				const { force } = effect_payload as EffectTypeInfo[typeof payload];

				target.map((target) => {
					world.insert(target, Velocity({ velocity: force }));
					world.despawn(id);
				});
			})

			.with(__, () => {})
			.exhaustive();
	}
}
