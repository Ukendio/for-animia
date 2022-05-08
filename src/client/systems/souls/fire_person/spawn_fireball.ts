import { useEvent, World } from "@rbxts/matter";
import { Players, UserInputService } from "@rbxts/services";
import { fireball } from "shared/effects/bin/fireball";
import { Controls } from "client/main.client";
import { Renderable, Soul } from "shared/components";
import { Option } from "@rbxts/rust-classes";

export function spawn_fireball(world: World, controls: Controls): void {
	for (const [, { model }, soul] of world.query(Renderable, Soul)) {
		if (soul.name !== "Fire Person") continue;

		for (const [, { KeyCode }] of useEvent(UserInputService, "InputBegan")) {
			if (KeyCode === controls.use_ability_1) {
				const cf = model.GetPivot();
				const goal = Players.GetPlayerFromCharacter(model)!.GetMouse().Hit.Position;

				fireball(world, Option.some(Players.LocalPlayer), cf, goal);
			}
		}
	}
}
