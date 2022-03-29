import { World } from "@rbxts/matter";
import { EffectPayload } from ".";
import { explosion } from "./effects/explosions";
import { inflict_damage } from "./effects/inflict_damage";

export function replicate_fx_on_client(world: World, { variant, creator, target, pos }: EffectPayload): void {
	if (variant.type === "Damage") inflict_damage(world, variant, target, creator);
	else if (variant.type === "Explosion") explosion(world, variant, pos);
}
