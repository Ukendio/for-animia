import { World } from "@rbxts/matter";
import { Effect } from "shared/components";

export function damage_hurts(world: World): void {
	for (const [, { variant }] of world.query(Effect)) {
		if (variant.type !== "Damage") continue;
		const damage = variant.damage;
		print(damage);
	}
}
