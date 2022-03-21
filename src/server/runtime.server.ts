import { Loop, useThrottle, World } from "@rbxts/matter";
import promiseR15 from "@rbxts/promise-character";
import { HashMap, Option } from "@rbxts/rust-classes";
import { Players, ReplicatedStorage, RunService, Workspace } from "@rbxts/services";
import { Counter, Mob, Transform } from "shared/components";
import mobs_database from "./mobs_database";
import { players_are_targets } from "./systems/players_are_targets";
import { remove_missing_models } from "shared/systems/remove_missing_models";
import { spawn_mobs } from "./systems/spawn_mobs";
import update_transforms from "shared/systems/update_transforms";
import { frictionless_grapplers } from "./systems/frictionless_grapplers";
import { apply_mass } from "./systems/apply_mass";
import remotes from "shared/remotes";
import { ice_arrows } from "./systems/souls/gray/ice_arrows";
import tracker_moves from "./systems/tracker_moves";
import { remove_missing_trackers } from "./systems/remove_missing_trackers";

remotes.Server.Create("ReplicateFX");

const world = new World();
const loop = new Loop(world);

loop.scheduleSystems([
	players_are_targets,
	remove_missing_models,
	remove_missing_trackers,
	update_transforms,
	spawn_mobs,
	frictionless_grapplers,
	apply_mass,
	ice_arrows,
	tracker_moves,
]);

loop.begin({
	default: RunService.Heartbeat,
});

function spawn_islands(): Folder {
	const islands = ReplicatedStorage.Assets.Islands.Clone();
	islands.Parent = Workspace;

	return islands;
}

type Islands = Folder & { [K in IslandNames]: Model & typeof mobs_database[K] };

const islands = spawn_islands() as Islands;

function generate_spawns_on_islands(islands: Islands): HashMap<string, HashMap<CFrame, number>> {
	const islands_with_mobs = HashMap.empty<string, HashMap<CFrame, number>>();

	for (const [name, spawns] of pairs(mobs_database)) {
		const island = islands[name];

		const mob_spawns = HashMap.empty<CFrame, number>();
		const spawn_folder = new Instance("Model");
		spawn_folder.Parent = island;

		for (const [_, id] of pairs(spawns)) {
			const part = new Instance("Part");
			part.Size = new Vector3(4, 1, 4);

			part.Parent = spawn_folder;

			const origin = island.GetPivot().Position;
			part.Position = origin.add(
				new Vector3(
					part.Size.X / 2 + math.random(1, 2) === 1 ? -island.GetExtentsSize().X : island.GetExtentsSize().X,
					origin.Y + part.Size.Y / 2,
					part.Size.Z + math.random(1, 2) === 1 ? -island.GetExtentsSize().Z : island.GetExtentsSize().Z,
				),
			);

			part.Transparency = 0.7;
			part.BrickColor = BrickColor.Red();

			mob_spawns.entry(part.CFrame).insert(id);
		}

		islands_with_mobs.entry(name).insert(mob_spawns);
	}

	return islands_with_mobs;
}

function spawn_mobs_from_island_spawns(islands_mobs: HashMap<string, HashMap<CFrame, number>>): void {
	for (const [, spawns] of islands_mobs.iter().generator()) {
		for (const [cf, id] of spawns.iter().generator()) {
			world.spawn(Mob({ id: id }), Transform({ cf: cf.add(new Vector3(0, 3, 0)) }));
		}
	}
}

spawn_mobs_from_island_spawns(generate_spawns_on_islands(islands));

function spawn_players(): void {
	const player_added = (player: Player): void => {
		if (player.Character) character_added(player.Character);
		else player.CharacterAdded.Connect(character_added);
	};

	const character_added = (character: Model): Promise<void> =>
		promiseR15(character).then(() => {
			const island = islands["[1] Foo"];
			const goal_position = island.GetPivot().Position;

			wait(0.2);
			character.PivotTo(new CFrame(goal_position.add(new Vector3(0, 3, 0))));
		});

	Players.GetPlayers().forEach(player_added);

	Players.PlayerAdded.Connect(player_added);
}

spawn_players();
