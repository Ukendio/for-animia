import { useEvent, World } from "@rbxts/matter";
import { UserInputService } from "@rbxts/services";
<<<<<<< HEAD
import { death } from "shared/effects/bin/death";
import { ClientState } from "shared/clientState";
=======
import { ClientState } from "client/game.client";
import { death } from "shared/effects/bin/death";
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a

function playDead(world: World, state: ClientState): void {
	for (const [, { KeyCode }, gpe] of useEvent(UserInputService, "InputBegan")) {
		if (gpe) continue;
		if (KeyCode === Enum.KeyCode.G) {
			const temp = death(state.character);

			task.delay(50, () => {
				temp.Destroy();
			});
		}
	}
}

export = {
	event: "fixed",
	system: playDead,
};
