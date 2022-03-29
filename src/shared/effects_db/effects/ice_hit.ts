import { New } from "@rbxts/fusion";
import { Vec } from "@rbxts/rust-classes";
import { TweenService } from "@rbxts/services";
import { compose_effects } from "../emitter";
import { gradient } from "./gradient";
import { shards } from "./shards";
import { smoke } from "./smoke";
import { snowflakes } from "./snowflakes";
import { spark } from "./spark";
import { specs } from "./specs";

export function ice_hit(pos: Vector3): Model {
	const model = compose_effects(
		Vec.fromPtr([
			spark(
				new ColorSequence(Color3.fromRGB(116, 185, 254)),
				new NumberSequence([new NumberSequenceKeypoint(0, 1.42), new NumberSequenceKeypoint(1, 10)]),
				"",
			),
			gradient(
				new ColorSequence(Color3.fromRGB(124, 197, 254)),
				new NumberSequence([new NumberSequenceKeypoint(0, 1), new NumberSequenceKeypoint(1, 10)]),
			),
			snowflakes(
				new ColorSequence(Color3.fromRGB(123, 207, 254)),
				new NumberSequence([
					new NumberSequenceKeypoint(0, 0),
					new NumberSequenceKeypoint(0.202, 1.25, 1.25),
					new NumberSequenceKeypoint(1, 0),
				]),
			),
			shards(
				new ColorSequence(Color3.fromRGB(126, 195, 254)),
				new NumberSequence([
					new NumberSequenceKeypoint(0, 0),
					new NumberSequenceKeypoint(0.204, 0.212, 1.12),
					new NumberSequenceKeypoint(1, 0),
				]),
			),
			smoke(
				new ColorSequence(Color3.fromRGB(137, 221, 254)),
				new NumberSequence([
					new NumberSequenceKeypoint(0, 1),
					new NumberSequenceKeypoint(0.5, 0.75),
					new NumberSequenceKeypoint(1, 1),
				]),
			),
			specs(
				new ColorSequence(Color3.fromRGB(126, 195, 254)),
				new NumberSequence([
					new NumberSequenceKeypoint(0, 0),
					new NumberSequenceKeypoint(0.199, 1.56, 0.938),
					new NumberSequenceKeypoint(1, 0),
				]),
			),
		]),
	).once(1, 1, 5, 20, 25, 35);

	const light_src = New("PointLight")({
		Brightness: 2.25,
		Color: Color3.fromRGB(157, 223, 255),
		Range: 8,
		Parent: model.PrimaryPart,
	});

	Promise.delay(0.35).then(() => {
		TweenService.Create(light_src, new TweenInfo(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
			Brightness: 0,
		}).Play();
	});

	return model;
}
