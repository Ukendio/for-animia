import { InferComponents, World } from "@rbxts/matter";
import { Effect, Lifetime, Renderable, Replicate, SufferDamage, Velocity } from "shared/components";
import { compose_effects, DeserializedEffect, EffectType, SerializedEffect } from "shared/effects_db";
import { explosion_1 } from "shared/effects_db/explosions";
import { Option, Vec } from "@rbxts/rust-classes";

import remotes from "shared/remotes";
import { Iterate } from "@rbxts/matter/src/lib/World";

const create_fx = remotes.Client.Get("CreateFX2");
const replicate_fx = remotes.Client.Get("ReplicateFX2");

function replicate_fx_on_client(
	world: World,
	{ effect_type, effect_payload, creator, target, pos }: DeserializedEffect,
): void {
	const a = effect_type ?? effect_payload ?? creator ?? target ?? pos;
	if (effect_type === EffectType.Damage) {
		const { damage } = effect_payload;

		target.map((target) => world.insert(target, SufferDamage({ damage, source: creator })));
	} else if (effect_type === EffectType.Explosion) {
		const { size } = effect_payload;

		world.spawn(
			Renderable({
				model: compose_effects(pos.unwrapOr(Vector3.one), Vec.fromPtr([explosion_1(size)])).once(1),
			}),
			Lifetime({ remaining_time: 2 }),
		);
	} else if (effect_type === EffectType.KnockBack) {
		const { force } = effect_payload;

		target.map((target) => world.insert(target, Velocity()));
	}
}

export const spawn_effects = {
	priority: 100,
	system: (world: World): void => {
		for (const [id, effect] of world.query(Effect).without(Replicate)) {
			let should_predict = true;
			if (effect.effect_type === EffectType.Damage) {
				should_predict = false;
			}

			world.insert(id, Replicate({ should_predict }));
		}

		for (const [, effect, { should_predict }] of world.query(Effect, Replicate)) {
			const { creator, effect_type, effect_payload, target, pos } = effect;

			if (should_predict) {
				replicate_fx_on_client(world, effect);
			}

			create_fx.SendToServer({
				creator: creator.asPtr(),
				effect_type,
				effect_payload,
				target: target.asPtr(),
				pos: pos.asPtr(),
			} as never);
		}
	},
};
