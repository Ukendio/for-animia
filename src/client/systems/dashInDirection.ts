import { useEvent, World } from "@rbxts/matter";
import { HttpService, Players, UserInputService } from "@rbxts/services";
import { ClientState } from "client/game.client";
import { Effect } from "shared/components";
import { EffectVariant } from "shared/effects";
import { DashDirection } from "shared/effects/bin/dash";

function dashInDirection(world: World, state: ClientState): void {
	for (const [, { KeyCode }, gameProcessedEvent] of useEvent(UserInputService, "InputBegan")) {
		if (gameProcessedEvent) continue;

		let direction = DashDirection.Forward;

		if (UserInputService.IsKeyDown(Enum.KeyCode.A)) direction = DashDirection.Left;
		if (UserInputService.IsKeyDown(Enum.KeyCode.S)) direction = DashDirection.Back;
		if (UserInputService.IsKeyDown(Enum.KeyCode.D)) direction = DashDirection.Right;

		if (UserInputService.MouseBehavior !== Enum.MouseBehavior.LockCenter) direction = DashDirection.Forward;

		if (KeyCode === Enum.KeyCode.Q) {
			world.spawn(
				Effect({
					source: Players.LocalPlayer,
					variant: EffectVariant.Dash(direction),
					predictionGUID: HttpService.GenerateGUID(false),
				}),
			);
		}

		state.lastInput = KeyCode;
	}
}

export = {
	event: "fixed",
	system: dashInDirection,
};
