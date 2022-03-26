import { World } from "@rbxts/matter";
import { Vec } from "@rbxts/rust-classes";
import { Renderable, Lifetime, Velocity } from "shared/components";
import { MappedEffect, compose_effects, EffectType } from "..";
import { explosion_1 } from "./explosions";

export function replicate_fx_on_client(
	world: World,
	{ effect_type, effect_payload, creator, target, pos }: MappedEffect,
): void {
	if (effect_type === EffectType.Damage) {
	} else if (effect_type === EffectType.Explosion) {
		const { size } = effect_payload;

		if (pos) {
			world.spawn(
				Renderable({
					model: compose_effects(pos, Vec.fromPtr([explosion_1(size)])).once(1),
				}),
				Lifetime({ remaining_time: 2 }),
			);
		}
	} else if (effect_type === EffectType.KnockBack) {
		const { force } = effect_payload;

		if (target !== undefined) world.insert(target, Velocity());
	}
}
