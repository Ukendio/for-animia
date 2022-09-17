import { useEvent, World } from "@rbxts/matter";
import { UserInputService, Workspace } from "@rbxts/services";
import { ClientState } from "shared/clientState";
import { InputKind } from "shared/inputMapperMessage";

let lastPointerClick = -1;
let lastHeld = -1;

function translateInput(client: ClientState, input: InputObject, gpe: boolean): boolean {
	if (gpe) return false;

	const hasBegan = input.UserInputState === Enum.UserInputState.Begin;

	if (input.KeyCode !== Enum.KeyCode.Unknown) {
		client.lastProcessedCommand = (hasBegan ? InputKind.KeyDown : InputKind.KeyUp)(input.KeyCode);
		return true;
	} else if (input.UserInputType === Enum.UserInputType.MouseButton1) {
		if (lastPointerClick === undefined) lastPointerClick = os.clock();

		const clickedFast = os.clock() - lastPointerClick <= 0.5;
		const command = hasBegan
			? clickedFast
				? InputKind.DoubleClick
				: InputKind.PointerClick
			: InputKind.HoldRelease(os.clock() - lastHeld);
		client.lastProcessedCommand = command;
		if (hasBegan) {
			lastPointerClick = os.clock();
			lastHeld = os.clock();
		}

		return true;
	}
	return false;
}

/*
const COMMAND_BEGIN_EVENT = ["InputBegan", "TouchTap"] as const
const COMMAND_ENDED_EVENT = ["InputEnded", "TouchEnded"] as const
*/

const DUMMY_TOUCH_TAP = {
	UserInputState: Enum.UserInputState.Begin,
	UserInputType: Enum.UserInputType.Touch,
} as InputObject;

function inputMapper(_: World, client: ClientState): void {
	if (!(client.character.Parent === Workspace)) return;

	//  We need to position this above "InputBegan" to detect whether the input is valid

	for (const [, input, gpe] of useEvent(UserInputService, "InputBegan")) {
		const shouldEscape = translateInput(client, input, gpe);
		if (shouldEscape) return undefined;
	}

	for (const [, , gpe] of useEvent(UserInputService, "TouchTapInWorld")) {
		const shouldEscape = translateInput(client, DUMMY_TOUCH_TAP, gpe);
		if (shouldEscape) return undefined;
	}

	for (const [, input, gpe] of useEvent(UserInputService, "InputEnded")) {
		const shouldEscape = translateInput(client, input, gpe);
		if (shouldEscape) return undefined;
	}

	client.lastProcessedCommand = undefined;
}

export = {
	event: "default",
	system: inputMapper,
};
