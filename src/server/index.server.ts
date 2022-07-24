import { start } from "shared/start";
import { emitEffects } from "server/emitEffects";
import { setupTags } from "../shared/setupTags";
import { Workspace, Players, ReplicatedStorage } from "@rbxts/services";
import { Charge, Renderable, Target } from "shared/components";
import promiseR15 from "@rbxts/promise-character";

declare const script: { systems: Folder };
const [world] = start([script.systems, ReplicatedStorage.Shared.systems], {});

emitEffects(world);
setupTags(world);

world.spawn(
	Renderable({ model: Workspace.FindFirstChild("Lambo") as Model }),
	Charge({
		charge: 100,
	}),
);

function characterAdded(character: Model): void {
	promiseR15(character).andThen((model) => {
		world.spawn(Renderable({ model }), Target());
	});
}

function playerAdded(player: Player): void {
	if (player.Character) characterAdded(player.Character);
	player.CharacterAdded.Connect(characterAdded);
}

Players.PlayerAdded.Connect(playerAdded);
for (const player of Players.GetPlayers()) {
	if (player === Players.LocalPlayer) continue;

	playerAdded(player);
}
