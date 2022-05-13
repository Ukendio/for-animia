import { AnyEntity, component, World } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { Vec } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";
import { match } from "@rbxts/variant";
import { Agency, CombatStats, Mastery, Mob, Perk, PerkVariant, Renderable, ShadowClone } from "shared/components";

const BLACKLIST = {
	55099692: ["David", "Sinner"],
	1177286754: ["Aj", "Runner"],
	63510777: ["Kenny", "Clown"],
	82439951: ["Khervin", "Simp"],
	1440270567: ["Wilson", "Lonely"],
	259292308: ["Keith", "Dumb"],
} as const;

export const Rogue = component<{
	name: typeof BLACKLIST[keyof typeof BLACKLIST][0];
	tag: typeof BLACKLIST[keyof typeof BLACKLIST][1];
}>();

const dyn_cached_players = new Set<Player>();

export function blacklist_rogues(world: World): void {
	for (const [id, { player }] of world.query(Agency, CombatStats, Renderable)) {
		if (dyn_cached_players.has(player)) return;

		const rogue_data = BLACKLIST[player.UserId as keyof typeof BLACKLIST];

		if (rogue_data === undefined) return;

		const [name, tag] = rogue_data;

		world.insert(id, Rogue({ name, tag }));

		dyn_cached_players.add(player);
	}

	for (const [id, { name }, renderable, combat_stats, mastery] of world
		.query(Rogue, Renderable, CombatStats, Mastery)
		.without(Perk)) {
		const character = renderable.model as CharacterRigR15;

		world.insert(
			id,
			Perk({
				variant: match(
					{ type: name },
					{
						David: () => {
							return PerkVariant.LonelyWarrior;
						},
						Aj: PerkVariant.LonelyWarrior,
						Kenny: () => {
							const stats = base_stats(mastery.lvl);

							character.RightUpperLeg.Transparency = 1;
							character.RightLowerLeg.Transparency = 1;
							character.RightFoot.Transparency = 1;

							world.insert(id, stats.patch({ max_hp: stats.max_hp * 0.85 }));

							return PerkVariant.LonelyWarrior;
						},
						Khervin: PerkVariant.LonelyWarrior,
						Wilson: PerkVariant.LonelyWarrior,
						Keith: () => {
							const dummy = character.Clone();
							dummy.Parent = Workspace;

							const cloned = world.spawn(
								Mob(),
								Renderable({
									model: dummy,
								}),
								combat_stats.patch({
									hp: combat_stats.max_hp * 0.5,
									max_hp: combat_stats.max_hp * 0.5,
									damage: combat_stats.damage * 0.5,
								}),
								ShadowClone(),
							);
							return PerkVariant.LonelyWarrior;
						},
					},
				),
			}),
		);
	}
}

function david_debuff(world: World): void {}
function aj_debuff(world: World): void {}
function kenny_debuff(combat_stats: ReturnType<typeof CombatStats>, character: CharacterRigR15): void {
	// change walk animation to some crippled movement
}
function khervin_debuff(world: World): void {}
function wilson_debuff(world: World, id: AnyEntity, character: CharacterRigR15): void {
	const mastery = world.get(id, Mastery);

	if (!mastery) return;

	const stats = base_stats(mastery.lvl);

	const allies = Vec.vec<AnyEntity>();

	for (const [target, renderable] of world.query(Renderable, Agency)) {
		if (id === target) continue;
		if (renderable.model.GetPivot().Position.sub(character.GetPivot().Position).Magnitude < 20) {
			allies.push(target);
		}
	}

	world.insert(
		id,
		stats.patch({
			damage: allies.len() > 0 ? stats.damage * 0.9 ** allies.len() : stats.damage * 1.5,
		}),
	);
}
function keith_debuff(world: World): void {}

declare function base_stats(lvl: number): ReturnType<typeof CombatStats>;
