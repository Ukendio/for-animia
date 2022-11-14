import { None, useThrottle, World } from "@rbxts/matter";
import { Widgets } from "@rbxts/plasma";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { ServerStorage, Workspace } from "@rbxts/services";
import { ServerState } from "server/index.server";
import { Body, Client, CombatStats, Renderable, Transform } from "shared/components";

function respawnCharacter(world: World, _: ServerState, ui: Widgets): void {
	for (const [id, client, combatStats, transform, body] of world.query(Client, CombatStats, Transform, Body)) {
		if (combatStats.state !== "Dead") continue;

		const character = body.model;

		if (character) {
			world.insert(id, combatStats.patch({ state: None, hp: combatStats.maxHp }));

			task.delay(3, () => {
				if (character.Parent === ServerStorage) {
					character.Parent = Workspace;

					character.Humanoid.WalkToPoint = transform.cf.Position;
				}
			});
		}
	}
}

export = respawnCharacter;
