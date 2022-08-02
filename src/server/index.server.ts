import { start } from "shared/start";
import { emitEffects } from "server/emitEffects";
import { setupTags } from "../shared/setupTags";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { Agency, Renderable } from "shared/components";
import promiseR15 from "@rbxts/promise-character";
import trackLineSight from "./trackLineSight";

declare const script: { systems: Folder };
const [world] = start([script.systems, ReplicatedStorage.Shared.systems], {});

emitEffects(world);
setupTags(world);
trackLineSight(world);

function playerAdded(player: Player): void {
	function characterAdded(character: Model): void {
		promiseR15(character).andThen((model) => {
			world.spawn(Renderable({ model }), Agency({ player, lineSight: Vector3.zero }));
		});
	}

	if (player.Character) characterAdded(player.Character);
	player.CharacterAdded.Connect(characterAdded);
}

Players.PlayerAdded.Connect(playerAdded);
for (const player of Players.GetPlayers()) {
	if (player === Players.LocalPlayer) continue;

	playerAdded(player);
}
