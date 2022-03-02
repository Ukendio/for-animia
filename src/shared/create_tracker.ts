import { Entity, InferComponents, World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { Projectile, Renderable, Rotation, Tracker, Transform } from "./components";

export function create_tracker(
	world: World,
	origin: CFrame,
	cf: CFrame,
	name: string,
	caster_model: Model,
	angle: CFrame,
): Entity<InferComponents<[typeof Renderable, typeof Transform, typeof Projectile, typeof Tracker, typeof Rotation]>> {
	const p = new Instance("Part");
	p.Size = Vector3.one;
	p.Transparency = 1;
	p.Anchored = true;
	p.CanCollide = false;
	p.CanTouch = false;
	p.CastShadow = false;
	p.BrickColor = BrickColor.Red();

	const model = new Instance("Model");
	model.Name = name;
	model.PrimaryPart = p;
	model.Parent = Workspace.Effects;

	p.Parent = model;

	return world.spawn(
		Renderable({ model }),
		Transform({ cf }),
		Projectile({ goal: cf, origin, remaining_time: 1, caster_model }),
		Tracker(),
		Rotation({ angle }),
	);
}
