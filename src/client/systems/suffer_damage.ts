import { World } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { CombatStats, WantsMelee, Renderable } from "shared/components";

export function suffer_damage(world: World): void {
	for (const [id, stats, wants_melee] of world.query(CombatStats, WantsMelee)) {
		world.insert(id, stats.patch({ hp: wants_melee.damage }));
		world.remove(id, WantsMelee);
	}

	for (const [_, stats, renderable] of world.queryChanged(CombatStats, Renderable)) {
		if (stats.new && stats.new !== stats.old) {
			const character = renderable.model as CharacterRigR15;
			character.Humanoid.Health = stats.new.hp;
		}
	}
}
