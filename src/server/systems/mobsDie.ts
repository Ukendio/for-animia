import { World } from "@rbxts/matter";
import { CombatStats, Renderable } from "shared/components";

function mobsDie(world: World): void {
	for (const [id, combatStats] of world.query(CombatStats, Renderable)) {
		if (combatStats.hp <= 0) {
			world.despawn(id);
		}
	}
}

export = mobsDie;
