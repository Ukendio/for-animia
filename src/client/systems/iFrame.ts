import { useEvent, useThrottle, World } from "@rbxts/matter";
import { HttpService, Players, UserInputService } from "@rbxts/services";
import { Effect } from "shared/components";
import { EffectVariant } from "shared/effects";

const IFRAME_DURATION = 0.5;
const COOLDOWN = IFRAME_DURATION + 2.5;

const player = Players.LocalPlayer;

function iFrame(world: World): void {
	for (const [, { KeyCode }, gameProcessedEvent] of useEvent(UserInputService, "InputBegan")) {
		if (gameProcessedEvent) continue;

		if (KeyCode === Enum.KeyCode.E) {
			if (useThrottle(COOLDOWN)) {
				if (!player.Character) continue;

				world.spawn(
					Effect({
						source: player,
						variant: EffectVariant.InvincibilityFrame(IFRAME_DURATION),
						predictionGUID: HttpService.GenerateGUID(false),
					}),
				);
			}
		}
	}
}

export = {
	event: "fixed",
	system: iFrame,
};
