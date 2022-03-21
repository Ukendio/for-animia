import { useThrottle, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { Mastery, Mob, Renderable, Soul, Transform } from "shared/components";
import { souls_db } from "shared/souls_db";

const assets = ReplicatedStorage.Assets;
function find_soul_model(name: keyof typeof souls_db): Model {
	return Option.wrap(assets.FindFirstChild(name) as Model).unwrapOr(assets.Dummy.Clone());
}

export function spawn_mobs(world: World): void {
	if (useThrottle(5)) {
		const spawn_pos = new Vector3(100, 3, 100).mul(
			new Vector3(math.random(1, 2) === 1 ? 1 : -1, 1, math.random(1, 2) === 1 ? 1 : -1),
		);

		world.spawn(
			Soul({ name: "Deku" }),
			Mastery({ lvl: 3, exp: 100000 }),
			Transform({ cf: new CFrame(spawn_pos) }),
			Mob(),
		);
	}

	for (const [id, soul] of world.query(Soul, Mob, Transform).without(Renderable)) {
		const model = find_soul_model(soul.name);

		world.insert(id, Renderable({ model }));
	}
}
