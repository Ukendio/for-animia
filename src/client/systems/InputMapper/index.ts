import { Controller, OnInit } from "@flamework/core";
import { UserInputService } from "@rbxts/services";
import Yessir from "@rbxts/yessir";

const THUMBSTICK_DEADZONE = 0.14;

@Controller({
	loadOrder: 2,
})
export class InputMapper implements OnInit {
	public on_input = new Yessir<[Enum.KeyCode, Enum.UserInputType]>();
	public onInit() {
		UserInputService.InputBegan.Connect(({ KeyCode, UserInputType }) => {
			this.on_input.dispatchPar(KeyCode, UserInputType);
		});
		UserInputService.InputEnded.Connect((input_object) => {});
		UserInputService.InputChanged.Connect((input_object) => {
			if (
				input_object.KeyCode === Enum.KeyCode.Thumbstick1 ||
				input_object.KeyCode === Enum.KeyCode.Thumbstick2
			) {
				if (input_object.Position.Magnitude > THUMBSTICK_DEADZONE) {
					print(input_object);
					print("enable thumbstick");
				}
			} else {
			}
		});
		UserInputService.GamepadConnected.Connect(() => {
			print("enable gamepad");
		});
		UserInputService.GamepadDisconnected.Connect(() => {
			print("disconnect gamepad");
		});
	}
}
