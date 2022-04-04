import { World } from "@rbxts/matter";
import { match } from "@rbxts/variant";
import { EffectPayload } from ".";
import { explosion } from "./effects/explosions";
import { inflict_damage } from "./effects/inflict_damage";

export function replicate_fx_on_client(world: World, { variant, creator, target, pos }: EffectPayload): void {
	match(variant, {
		Damage: ({ damage }) => inflict_damage(world, target, creator, damage),
		Explosion: ({ size }) => explosion(world, pos, size),
		KnockBack: () => {},
		Slow: () => {},
		Track: () => {},
	});
}
