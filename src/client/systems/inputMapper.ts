import { log, useEvent, World } from "@rbxts/matter";
import { UserInputService } from "@rbxts/services";
import { InputMapperMessage } from "shared/inputMapperMessage";
import { ClientState } from "shared/playerState";

function inputMapper(_: World, state: ClientState): void {
	state.inputBuffer.shift();

	for (const [, input, gpe] of useEvent(UserInputService, "InputBegan")) {
		if (gpe) continue;

		if (input.KeyCode !== Enum.KeyCode.Unknown) {
			state.inputBuffer.push(InputMapperMessage.KeyDown(input.KeyCode));
		} else if (input.UserInputType === Enum.UserInputType.MouseButton1) {
			state.inputBuffer.push(InputMapperMessage.PointerClick);
		}
	}

	for (const [, input, gpe] of useEvent(UserInputService, "InputEnded")) {
		if (gpe) continue;

		if (input.KeyCode !== Enum.KeyCode.Unknown) {
			state.inputBuffer.push(InputMapperMessage.KeyUp(input.KeyCode));
		}
	}
}

export = {
	priority: math.huge,
	system: inputMapper,
};
