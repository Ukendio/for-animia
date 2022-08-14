import { Entity, log, World } from "@rbxts/matter";
import { CombatStats, Effect, Renderable } from "shared/components";
import { EffectVariant } from "shared/effects";

function damageHurts(world: World): void {
	for (const [id, effect] of world.query(Effect)) {
		log(id);
		const { target, source, variant } = effect;

		if (variant.type === EffectVariant.Damage.type && target && source) {
			// TODO: Use sourceId to verify whether it is sane that source did X damage
			const [targetId] = [target.GetAttribute("entityId"), source.GetAttribute("entityId")] as LuaTuple<
				Entity<[Renderable, CombatStats]>[]
			>;

			if (targetId !== undefined) {
				const targetCombatStats = world.get(targetId, CombatStats);
				log("test");

				world.insert(
					targetId,
					targetCombatStats.patch({
						hp: targetCombatStats.hp - variant.damage,
					}),
				);
			}
		}

		world.despawn(id);
	}
}

export = damageHurts;
