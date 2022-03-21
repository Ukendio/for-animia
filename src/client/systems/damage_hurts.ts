import { World } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { CombatStats, Renderable, SufferDamage } from "shared/components";

export function damage_hurts(world: World): void {
	for (const [id, stats, suffer_damage] of world.query(CombatStats, SufferDamage)) {
		world.insert(id, stats.patch({ hp: stats.hp - suffer_damage.damage }));
		// replicate this?
		world.remove(id, SufferDamage);
	}

	for (const [_, stats, renderable] of world.queryChanged(CombatStats, Renderable)) {
		if (stats.new && stats.new !== stats.old) {
			const character = renderable.model as CharacterRigR15;
			character.Humanoid.Health = stats.new.hp;
		}
	}
}
