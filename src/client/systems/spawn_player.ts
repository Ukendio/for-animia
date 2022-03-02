import { useEvent, World } from "@rbxts/matter";
import promiseR15 from "@rbxts/promise-character";
import { Players } from "@rbxts/services";
import { Target, Renderable, CombatStats, Gray } from "shared/components";

function character_added(world: World, char: Model): void {
	for (const [, { model }] of world.query(Renderable, Target)) {
		if (model === char) return;
	}

	promiseR15(char).then((character) => {
		world.spawn(
			Target(),
			Renderable({ model: character }),
			CombatStats({ hp: 100, max_hp: 100, damage: 50 }),
			Gray(),
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
