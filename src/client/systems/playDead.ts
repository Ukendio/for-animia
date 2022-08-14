import { useEvent, World } from "@rbxts/matter";
import { UserInputService } from "@rbxts/services";
import { death } from "shared/effects/bin/death";
import { ClientState } from "shared/playerState";

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
