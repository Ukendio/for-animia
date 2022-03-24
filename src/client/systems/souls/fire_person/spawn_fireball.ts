import { useEvent, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { Players, UserInputService } from "@rbxts/services";
import { fireball } from "shared/effects_db/fireball";
import { ClientData } from "client/main.client";
import { Renderable, Soul } from "shared/components";

export function spawn_fireball(world: World, controls: ClientData): void {
	for (const [id, { model }, soul] of world.query(Renderable, Soul)) {
		if (soul.name !== "Fire Person") continue;

		for (const [, { KeyCode }] of useEvent(UserInputService, "InputBegan")) {
			if (KeyCode === controls.use_ability_1) {
				const cf = model.GetPivot();
				const goal = Players.GetPlayerFromCharacter(model)!.GetMouse().Hit.Position;

				fireball(world, Option.some(id), cf, goal);
			}
		}
	}
}
