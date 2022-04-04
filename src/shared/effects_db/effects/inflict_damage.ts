import { AnyEntity, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { SufferDamage } from "shared/components";

export function inflict_damage(
	world: World,
	target: Option<AnyEntity>,
	source: Option<AnyEntity>,
	damage: number,
): void {
	target.map((id) => {
		world.insert(id, SufferDamage({ source, damage }));
	});
}
