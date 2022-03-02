import { useThrottle, World } from "@rbxts/matter";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Archer, Transform, Renderable } from "shared/components";

export function spawn_archers(world: World): void {
	if (useThrottle(10)) {
		const origin = new Vector3(math.random(1, 50), 4, math.random(1, 50));

		world.spawn(Archer(), Transform({ cf: new CFrame(origin) }));
	}

	for (const [id] of world.query(Transform, Archer).without(Renderable)) {
		const model = ReplicatedStorage.Assets.ArcherModel.Clone();
		model.Parent = Workspace;

		world.insert(id, Renderable({ model }));
	}
}
