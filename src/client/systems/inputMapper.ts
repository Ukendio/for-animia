import { useEvent, World } from "@rbxts/matter";
import { UserInputService } from "@rbxts/services";
import { InputMapperMessage } from "shared/inputMapperMessage";
import { ClientState } from "shared/clientState";

function inputMapper(_: World, { commandRecord }: ClientState): void {
	for (const [, input, gpe] of useEvent(UserInputService, "InputBegan")) {
		if (gpe) continue;

		if (input.KeyCode !== Enum.KeyCode.Unknown) {
			commandRecord.new = InputMapperMessage.KeyDown(input.KeyCode);
			return undefined;
		} else if (input.UserInputType === Enum.UserInputType.MouseButton1) {
			commandRecord.new = InputMapperMessage.PointerClick;
			return undefined;
		}
	}

	for (const [, input, gpe] of useEvent(UserInputService, "InputEnded")) {
		if (gpe) continue;

		if (input.KeyCode !== Enum.KeyCode.Unknown) {
			commandRecord.new = InputMapperMessage.KeyUp(input.KeyCode);
			return undefined;
		} else if (input.UserInputType === Enum.UserInputType.MouseButton1) {
			commandRecord.new = InputMapperMessage.HoldRelease;
			return undefined;
		}
	}

	commandRecord.new = undefined;
}

export = {
	event: "default",
	system: inputMapper,
};
