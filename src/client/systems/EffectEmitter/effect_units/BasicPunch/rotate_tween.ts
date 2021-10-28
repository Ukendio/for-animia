import { Janitor } from "@rbxts/janitor";
import { RunService } from "@rbxts/services";
import tween from "./tween";

const head_janitor = new Janitor();

export function rotate_tween<T extends BasePart>(
	object: T,
	rotation: number,
	time: number,
	style: Enum.EasingStyle,
): void {
	const value = new Instance("NumberValue");
	const tween_seq = tween(value, { Value: rotation }, time, style);
	tween_seq.Play();

	const janitor = head_janitor.Add(new Janitor());

	let changed = 0;
	janitor.Add(
		RunService.RenderStepped.Connect(() => {
			object.CFrame = object.CFrame.mul(CFrame.Angles(0, math.rad(value.Value - changed), 0));
			changed = value.Value;
		}),
	);

	janitor.Add(
		tween_seq.Completed.Connect(() => {
			janitor.Destroy();
		}),
	);
}
