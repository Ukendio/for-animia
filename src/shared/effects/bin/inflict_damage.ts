import { AnyEntity, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { SufferDamage } from "shared/components";

export function inflict_damage(world: World, src: Option<Player>, target: Option<Model>, damage: number): void {
	target.match((model) => {
		const id = model.GetAttribute("entity_id") as AnyEntity;

		if (id !== undefined) world.insert(id, SufferDamage({ damage, src }));
	}, warn);
}
