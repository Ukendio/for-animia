import { TweenService } from "@rbxts/services";

type PropGoals<T extends Instance> = Partial<WritableInstanceProperties<T>>;

export = <T extends Instance>(
	object: T,
	goals: PropGoals<T>,
	duration = 0.5,
	style: Enum.EasingStyle = Enum.EasingStyle.Quad,
	direction: Enum.EasingDirection = Enum.EasingDirection.Out,
) => {
	const tween_info = new TweenInfo(duration, style, direction);
	const tween = TweenService.Create(object, tween_info, goals);
	return tween;
};
