import { useDeltaTime, useEvent, useThrottle, World } from "@rbxts/matter";
import { UserInputService, Workspace } from "@rbxts/services";
import { ClientState } from "shared/clientState";
import { InputKind } from "shared/inputMapperMessage";

let holdDuration = 0;
function inputMapper(_: World, client: ClientState): void {
	if (!(client.character.Parent === Workspace)) return;

	for (const [, input, gpe] of useEvent(UserInputService, "InputBegan")) {
		if (gpe) return undefined;
		if (input.KeyCode !== Enum.KeyCode.Unknown) {
			client.lastProcessedCommand = InputKind.KeyDown(input.KeyCode);
		} else if (input.UserInputType === Enum.UserInputType.MouseButton1) {
			if (useThrottle(0.5)) {
				client.lastProcessedCommand = InputKind.PointerClick;
				return undefined;
			}
			client.lastProcessedCommand = InputKind.DoubleClick;
		}
		return undefined;
	}

	for (const [, input, gpe] of useEvent(UserInputService, "InputEnded")) {
		if (gpe) return undefined;

		if (input.KeyCode !== Enum.KeyCode.Unknown) {
			client.lastProcessedCommand = InputKind.KeyUp(input.KeyCode);
		} else if (input.UserInputType === Enum.UserInputType.MouseButton1) {
			client.lastProcessedCommand = InputKind.HoldRelease;
		}
		return undefined;
	}

	if (UserInputService.IsMouseButtonPressed(Enum.UserInputType.MouseButton1)) {
		holdDuration += useDeltaTime();
		client.lastProcessedCommand = InputKind.Hold(holdDuration);
		return;
	}

	holdDuration = 0;
	client.lastProcessedCommand = undefined;
	return;
}

export = {
	event: "default",
	system: inputMapper,
};
