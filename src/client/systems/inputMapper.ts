import { useDeltaTime, useEvent, World } from "@rbxts/matter";
import { UserInputService, Workspace } from "@rbxts/services";
import { translateInput } from "client/translateInput";
import { ClientState } from "shared/clientState";
import { InputKind } from "shared/inputMapperMessage";

let holdDuration = 0;
function inputMapper(_: World, client: ClientState): void {
	if (!(client.character.Parent === Workspace)) return;

	//  We need to position this above "InputBegan" to detect whether the input is valid

	for (const [, input, gpe] of useEvent(UserInputService, "InputBegan")) {
		const shouldEscape = translateInput(client, input, gpe);
		if (shouldEscape) return undefined;
	}

	for (const [, input, gpe] of useEvent(UserInputService, "InputEnded")) {
		const shouldEscape = translateInput(client, input, gpe);
		if (shouldEscape) return undefined;
	}

	if (UserInputService.IsMouseButtonPressed(Enum.UserInputType.MouseButton1)) {
		holdDuration += useDeltaTime();
		client.lastProcessedCommand = InputKind.Hold(holdDuration);
		return;
	}

	holdDuration = 0;
	client.lastProcessedCommand = undefined;
}

export = {
	event: "default",
	system: inputMapper,
};
