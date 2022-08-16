import { start } from "shared/start";
import { emitEffects } from "server/emitEffects";
import { setupTags } from "../shared/setupTags";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { Agency, CombatStats, Renderable, Zone } from "shared/components";
import promiseR15 from "@rbxts/promise-character";
import trackLineSight from "./trackLineSight";
import { setPartCollisionGroup } from "shared/setCharacterCollisionGroup";
import { setupPhysicsCollisionRemove } from "./physicsGroupCollide";

declare const script: { systems: Folder };
export interface ServerState {}

const state: ServerState = {};

const world = start([script.systems, ReplicatedStorage.Shared.systems], state)(emitEffects, setupTags, trackLineSight);

world.spawn(Zone({ maxCapacity: 5, population: 0 }));

function playerAdded(player: Player): void {
	function characterAdded(character: Model): void {
		promiseR15(character).andThen((model) => {
			const playerId = world.spawn(
				Renderable({ model }),
				Agency({ player, lineSight: Vector3.zero }),
				CombatStats({
					hp: 100,
					maxHp: 100,
					damage: 10,
				}),
			);

			character.SetAttribute("entityId", playerId);

			setPartCollisionGroup(character, "Agency");
		});
	}

	if (player.Character) characterAdded(player.Character);
	player.CharacterAdded.Connect(characterAdded);
}

Players.PlayerAdded.Connect(playerAdded);
for (const player of Players.GetPlayers()) {
	playerAdded(player);
}

setupPhysicsCollisionRemove();
