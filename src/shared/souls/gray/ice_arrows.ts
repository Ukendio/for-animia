import { ReplicatedStorage, TweenService, Workspace } from "@rbxts/services";

export function ice_hit(pos: Vector3): void {
	const hit = ReplicatedStorage.Assets.Particles.Ice.Hit.Clone();
	hit.Position = pos;
	hit.Parent = Workspace.Effects;

	const orig = hit.Attachment;
	orig.Spark.Emit(1);
	orig.Gradient.Emit(1);
	orig.Snowflakes.Emit(5);
	orig.Shards.Emit(20);
	orig.Smoke.Emit(25);
	orig.Specs.Emit(35);

	task.delay(1.2, () => {
		hit.Destroy();
	});

	Promise.delay(0.35).then(() => {
		TweenService.Create(orig.PointLight, new TweenInfo(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
			Brightness: 0,
		}).Play();
	});
}
