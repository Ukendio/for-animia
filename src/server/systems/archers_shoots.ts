import { useThrottle, World } from "@rbxts/matter";
import { Option, Vec } from "@rbxts/rust-classes";
import { ReplicatedStorage } from "@rbxts/services";
import { Archer, Arrow, Renderable, Target, Transform } from "shared/components";

export function archers_shoots(world: World): void {
	if (useThrottle(15)) {
		const targets = Vec.vec<Vector3>();

		for (const [_, { model }] of world.query(Renderable, Target)) {
			targets.push(model.GetPrimaryPartCFrame().Position);
		}

		for (const [, , render] of world.query(Archer, Renderable)) {
			let closest_position = undefined! as Vector3;
			let closest_distance = undefined! as number;

			const model = render.model as ArcherModel;

			const current_position = model.GetPrimaryPartCFrame().Position;

			targets.iter().forEach((target) => {
				const distance = current_position.sub(target).Magnitude;

				if (!closest_position || distance < closest_distance) {
					closest_position = target;
					closest_distance = distance;
				}
			});

			if (closest_position) {
				const mid_attach = model.BowModel.Handle.Middle;
				const mid = mid_attach.WorldCFrame;

				const arrow_length = ReplicatedStorage.Assets.ArrowModel.Handle.Size.Z;
				const cf = mid.add(new Vector3(0, 0, arrow_length / 2));

				const humanoid = model.Humanoid;

				const animation = new Instance("Animation");
				animation.AnimationId = "rbxassetid://8786525230";

				task.defer(() =>
					Option.wrap(humanoid.FindFirstChildOfClass("Animator"))
						.match(
							(item) => item,
							() => {
								const animator = new Instance("Animator");
								animator.Parent = humanoid;
								return animator;
							},
						)
						.LoadAnimation(animation)
						.Play(),
				);

				const arrow_transform = Transform({
					cf,
				});

				world.spawn(Arrow({ goal: closest_position }), arrow_transform);
			}
		}
	}
}
