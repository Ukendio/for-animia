import { ClientState } from "shared/clientState";
import { InputKind } from "shared/inputMapperMessage";

let lastPointerClick = -1;
let lastHeld = -1;

export function translateInput(client: ClientState, input: InputObject, gpe: boolean): boolean {
	if (gpe) return false;

	const hasBegan = input.UserInputState === Enum.UserInputState.Begin;

	if (input.KeyCode !== Enum.KeyCode.Unknown) {
		client.lastProcessedCommand = (hasBegan ? InputKind.KeyDown : InputKind.KeyUp)(input.KeyCode);
		return true;
	} else if (input.UserInputType === Enum.UserInputType.MouseButton1) {
		if (lastPointerClick === -1) {
			lastPointerClick = os.clock();
		}

		const clickedFast = os.clock() - lastPointerClick <= 0.5;
		const command = hasBegan
			? clickedFast
				? InputKind.DoubleClick
				: InputKind.PointerClick
			: InputKind.HoldRelease;
		client.lastProcessedCommand = command;
		if (hasBegan) {
			lastPointerClick = os.clock();
			lastHeld = os.clock();
		}

		return true;
	}
	return false;
}
