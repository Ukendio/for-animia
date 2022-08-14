import { log, useEvent, World } from "@rbxts/matter";
import { HttpService, Players, UserInputService } from "@rbxts/services";
import { match } from "@rbxts/variant";
import { Effect } from "shared/components";
import { EffectVariant } from "shared/effects";
import { InputMapperMessage } from "shared/inputMapperMessage";
import { ClientState } from "shared/playerState";

const player = Players.LocalPlayer;
const mouse = player.GetMouse();

function attack(world: World, state: ClientState): void {
	if (state.inputBuffer.isEmpty()) return;

	const input = state.inputBuffer[0];

	if (input.type === InputMapperMessage.PointerClick.type) {
		log(input);
		const target = mouse.Target?.Parent as Model;

		if (target?.FindFirstChild("Humanoid")) {
			if (state.character.GetPivot().Position.sub(target.GetPivot().Position).Magnitude < 12) {
				world.spawn(
					Effect({
						predictionGUID: HttpService.GenerateGUID(false),
						variant: EffectVariant.Damage(10),
						target: target,
						source: Players.LocalPlayer,
					}),
				);
			}
		}

		state.inputBuffer.shift();
	}
}

export = {
	event: "fixed",
	system: attack,
};
