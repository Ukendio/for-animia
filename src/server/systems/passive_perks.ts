import { AnyEntity, useEvent, World } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { match } from "@rbxts/variant";
import { Agency, CombatStats, Mastery, Perk, Renderable, Transform } from "shared/components";
import { remotes } from "shared/remotes";

export function passive_perks(world: World): void {
	for (const [id, { variant }, renderable] of world.query(Perk, Renderable)) {
		const character = renderable.model as CharacterRigR15;

		match(variant, {
			LonelyWarrior: () => lonely_warrior(world, id, character),
			Clone: () => clone_me(world, id),
		});
	}
}

function lonely_warrior(world: World, id: AnyEntity, character: CharacterRigR15): void {
	const mastery = world.get(id, Mastery);

	if (!mastery) return;

	const stats = base_stats(mastery.lvl);

	const allies = new Array<AnyEntity>();

	for (const [target, renderable] of world.query(Renderable, Agency)) {
		if (id === target) continue;
		if (renderable.model.GetPivot().Position.sub(character.GetPivot().Position).Magnitude < 20) {
			allies.push(target);
		}
	}

	world.insert(
		id,
		stats.patch({
			damage: allies.size() > 0 ? stats.damage * 0.9 ** allies.size() : stats.damage * 1.5,
		}),
	);
}

function clone_me(world: World, id: AnyEntity): void {}

declare function base_stats(lvl: number): ReturnType<typeof CombatStats>;
