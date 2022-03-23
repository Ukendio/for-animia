import { World } from "@rbxts/matter";
import { Effect, Lifetime, Renderable, SufferDamage, Velocity } from "shared/components";
import { compose_effects, EffectType } from "client/effects_db";
import { explosion_1 } from "client/effects_db/explosions";
import { Vec } from "@rbxts/rust-classes";

export function spawn_effects(world: World): void {
	for (const [id, effect] of world.query(Effect).without(Renderable)) {
		const { creator, effect_type, effect_payload, target, pos } = effect;

		if (effect_type === EffectType.Damage) {
			const { damage } = effect_payload;

			target.map((target) => {
				world.insert(target, SufferDamage({ damage, source: creator }));
			});
		} else if (effect_type === EffectType.Explosion) {
			const { size } = effect_payload;

			pos.map((p) => {
				world.insert(
					id,
					Renderable({ model: compose_effects(p, Vec.fromPtr([explosion_1(size)])).once(1) }),
					Lifetime({ remaining_time: 2 }),
				);
			});
		} else if (effect_type === EffectType.KnockBack) {
			const { force } = effect_payload;

			target.map((target) => {
				world.insert(target, Velocity());
				world.despawn(id);
			});
		}
	}
}
