import { useEvent, World } from "@rbxts/matter";
import promiseR15 from "@rbxts/promise-character";
import { CollectionService, Players } from "@rbxts/services";
import { Target, Renderable, CombatStats, Mastery, Soul } from "shared/components";

function character_added(world: World, char: Model): void {
	if (char.GetAttribute("entity_id") !== undefined) return;

	promiseR15(char).then((character) => {
		character.SetAttribute(
			"entity_id",
			world.spawn(
				Target(),
				Renderable({ model: character }),
				CombatStats({ hp: 100, max_hp: 100, damage: 50, soul_power: 50, defense: 50 }),
				Mastery(),
				Soul({ name: "Gray" }),
			),
		);
	});
}

function spawn_player(world: World): void {
	const plr = Players.LocalPlayer;

	if (plr.Character) {
		character_added(world, plr.Character);
	}

	for (const [, char] of useEvent(plr, "CharacterAdded")) {
		character_added(world, char);
	}
}

export = { system: spawn_player, priority: 100 };
