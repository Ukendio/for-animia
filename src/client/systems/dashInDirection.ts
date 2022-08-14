import { useEvent, World } from "@rbxts/matter";
import { HttpService, Players, UserInputService } from "@rbxts/services";
import { Effect } from "shared/components";
import { EffectVariant } from "shared/effects";
import { DashDirection } from "shared/effects/bin/dash";
import { InputMapperMessage } from "shared/inputMapperMessage";
import { ClientState } from "shared/playerState";

function dashInDirection(world: World, state: ClientState): void {
	if (state.inputBuffer.isEmpty()) return;

	const input = state.inputBuffer[0];
	if (input.type === InputMapperMessage.KeyDown.type) {
		let direction = DashDirection.Forward;

		if (UserInputService.IsKeyDown(Enum.KeyCode.A)) direction = DashDirection.Left;
		if (UserInputService.IsKeyDown(Enum.KeyCode.S)) direction = DashDirection.Back;
		if (UserInputService.IsKeyDown(Enum.KeyCode.D)) direction = DashDirection.Right;

		if (UserInputService.MouseBehavior !== Enum.MouseBehavior.LockCenter) direction = DashDirection.Forward;

		if (input.key === Enum.KeyCode.Q) {
			world.spawn(
				Effect({
					source: Players.LocalPlayer,
					variant: EffectVariant.Dash(direction),
					predictionGUID: HttpService.GenerateGUID(false),
				}),
			);
		}
	}
}

export = {
	event: "fixed",
	system: dashInDirection,
};
