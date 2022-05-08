import { World } from "@rbxts/matter";
import { match } from "@rbxts/variant";
import { EffectPayload } from ".";
import { explosion } from "./bin/explosion";
import { inflict_damage } from "./bin/inflict_damage";

export function replicate_fx_on_client(world: World, { variant, target, pos, creator }: EffectPayload): void {
	match(variant, {
		Damage: ({ damage }) => inflict_damage(world, creator, target, damage),
		Explosion: ({ size }) => explosion(world, creator, pos, size),
		KnockBack: () => {},
		Slow: () => {},
		Track: () => {},
		Stun: () => {},
	});
}
