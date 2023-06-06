import { useEvent, useThrottle, World } from "@rbxts/matter";
import Plasma from "@rbxts/plasma";
import { Players, UserInputService } from "@rbxts/services";
import touchButton from "client/widgets/touchButton";
import { ClientState } from "shared/clientState";
import { InputKind } from "shared/inputMapperMessage";

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");
const touchControlFrame = playerGui?.FindFirstChild("TouchGui")?.FindFirstChild("TouchControlFrame") as Frame;
const minAxis = touchControlFrame ? math.min(touchControlFrame.AbsoluteSize.X, touchControlFrame.AbsoluteSize.Y) : 0;
const isSmallScreen = minAxis <= 500;

if (UserInputService.TouchEnabled) {
	if (!touchControlFrame.FindFirstChild("JumpButton")) {
		while (touchControlFrame.GetChildren().size() < 0) {
			touchControlFrame.ChildAdded.Wait();
		}
	}

	for (const instance of touchControlFrame.GetChildren()) {
		if (instance.IsA("ImageButton")) {
			instance.Destroy();
		}
	}
}

function jumpButton(): touchButton.TouchButtonHandle {
	const buttonSize = isSmallScreen ? 50 : 120;

	return touchButton({
		marker: "jump",
		size: UDim2.fromOffset(buttonSize, buttonSize),
		position: isSmallScreen
			? new UDim2(1, -(buttonSize * 1.5 + 10), 1, -buttonSize - 130)
			: new UDim2(1, -(buttonSize * 1.5 + 10), 1, -buttonSize * 1.75),
	});
}

function sprintButton(): touchButton.TouchButtonHandle {
	const buttonSize = isSmallScreen ? 50 : 120;

	return touchButton({
		marker: "sprint",
		size: UDim2.fromOffset(buttonSize, buttonSize),
		position: isSmallScreen
			? new UDim2(1, -(buttonSize * 1.5 + 10), 1, -buttonSize - 40)
			: new UDim2(1, -(buttonSize * 1.5 + 10), 1, -buttonSize * 1.75),
	});
}

function combatButton(): touchButton.TouchButtonHandle {
	const buttonSize = isSmallScreen ? 80 : 160;

	return touchButton({
		marker: "combat",
		size: UDim2.fromOffset(buttonSize, buttonSize),
		position: isSmallScreen
			? new UDim2(1, -(buttonSize * 1.5 + 50), 1, -buttonSize - 70)
			: new UDim2(1, -(buttonSize * 1.5 + 10), 1, -buttonSize * 1.75),
	});
}

function skillButton(): touchButton.TouchButtonHandle {
	const buttonSize = isSmallScreen ? 50 : 120;

	return touchButton({
		marker: "skill",
		size: UDim2.fromOffset(buttonSize, buttonSize),
		position: isSmallScreen
			? new UDim2(1, -(buttonSize * 1.5 + 220), 1, -buttonSize - 20)
			: new UDim2(1, -(buttonSize * 1.5 + 10), 1, -buttonSize * 1.75),
	});
}

function burstButton(): touchButton.TouchButtonHandle {
	const buttonSize = isSmallScreen ? 50 : 120;

	return touchButton({
		marker: "burst",
		size: UDim2.fromOffset(buttonSize, buttonSize),
		position: isSmallScreen
			? new UDim2(1, -(buttonSize * 1.5 + 150), 1, -buttonSize - 40)
			: new UDim2(1, -(buttonSize * 1.5 + 10), 1, -buttonSize * 1.75),
	});
}

const DUMMY_TOUCH_BEGIN = {
	KeyCode: Enum.KeyCode.Unknown,
	UserInputType: Enum.UserInputType.MouseButton1,
	UserInputState: Enum.UserInputState.Begin,
} as InputObject;

const DUMMY_TOUCH_ENDED = {
	KeyCode: Enum.KeyCode.Unknown,
	UserInputType: Enum.UserInputType.MouseButton1,
	UserInputState: Enum.UserInputState.End,
} as InputObject;

function fillDummyTouchBegin(props: Partial<WritableInstanceProperties<InputObject>>): InputObject {
	return { ...DUMMY_TOUCH_BEGIN, ...props };
}

function fillDummyTouchEnded(props: Partial<WritableInstanceProperties<InputObject>>): InputObject {
	return { ...DUMMY_TOUCH_ENDED, ...props };
}

const plasmaNode = new Plasma(touchControlFrame);

const yieldTime = 5;
const start = os.clock();

function translateTouchControl(_: World, client: ClientState): void {
	if (os.clock() - start < yieldTime) return;

	if (client.debugEnabled) return;
	if (!touchControlFrame) return;

	for (const [, instance] of useEvent(touchControlFrame, "ChildAdded")) {
		if (instance.Name === "JumpButton") {
			instance.Destroy();
		}
	}
	Plasma.start(plasmaNode, () => {
		client.isJumping = jumpButton().heldFor() > 0;
		client.isRunning = sprintButton().heldFor() > 0;
		const skillHandle = skillButton();
		const burstHandle = burstButton();

		const combatHandle = combatButton();

		if (useEvent(combatHandle.instance, "InputBegan")) {
			if (useThrottle(0.5)) {
				client.lastProcessedCommand = InputKind.PointerClick;
				return undefined;
			}
			client.lastProcessedCommand = InputKind.DoubleClick;
			return undefined;
		}

		if (useEvent(combatHandle.instance, "InputEnded")) {
			client.lastProcessedCommand = InputKind.HoldRelease;
		}

		if (skillHandle.tapped()) {
			client.lastProcessedCommand = InputKind.KeyDown(Enum.KeyCode.Q);
			return;
		} else if (burstHandle.tapped()) {
			client.lastProcessedCommand = InputKind.KeyDown(Enum.KeyCode.E);
			return;
		}
	});
}

export = translateTouchControl;
