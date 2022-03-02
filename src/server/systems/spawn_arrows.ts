import { World } from "@rbxts/matter";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Arrow, Renderable, Transform } from "shared/components";

export function spawn_arrows(world: World): void {
	for (const [id, transform] of world.query(Transform, Arrow).without(Renderable)) {
		print("this arrow needs a model");
		const arrow_model = ReplicatedStorage.Assets.ArrowModel.Clone();
		arrow_model.Parent = Workspace;

		world.insert(id, Renderable({ model: arrow_model }));
	}
}
