import { AnyEntity, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { SufferDamage } from "shared/components";
import { EffectVariant } from "..";

export function inflict_damage(
	world: World,
	{ damage }: EffectVariant<"Damage">,
	target: Option<AnyEntity>,
	source: Option<AnyEntity>,
): void {
	target.map((id) => {
		world.insert(id, SufferDamage({ source, damage }));
	});
}
