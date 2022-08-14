import { useEvent, useThrottle, World } from "@rbxts/matter";
import { HttpService, Players, UserInputService } from "@rbxts/services";
import { Effect } from "shared/components";
import { EffectVariant } from "shared/effects";
import { InputMapperMessage } from "shared/inputMapperMessage";
import { ClientState } from "shared/playerState";

const IFRAME_DURATION = 0.5;
const COOLDOWN = IFRAME_DURATION + 2.5;

const player = Players.LocalPlayer;

function iFrame(world: World, state: ClientState): void {
	if (state.inputBuffer.isEmpty()) return;

	const input = state.inputBuffer[0];
	if (input.type === InputMapperMessage.KeyDown.type && input.key === Enum.KeyCode.E) {
		if (useThrottle(COOLDOWN)) {
			if (!player.Character) return;

			world.spawn(
				Effect({
					source: Players.LocalPlayer,
					variant: EffectVariant.InvincibilityFrame(IFRAME_DURATION),
					predictionGUID: HttpService.GenerateGUID(false),
				}),
			);
		}
	}
}

export = {
	event: "fixed",
	system: iFrame,
};
