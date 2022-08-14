import { log, useThrottle, World } from "@rbxts/matter";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { CombatStats, Mob, Renderable, Transform, Zone } from "shared/components";
import removingMissingModels from "shared/systems/removingMissingModels";

function heightFromGround(root?: BasePart): number {
	let height = 2.7;
	if (root) {
		height = height - 1.25 * (2 - root.Size.Y);
	}
	return height;
}

function zonesSpawnMobs(world: World): void {
	for (const [id, zone] of world.query(Zone)) {
		if (useThrottle(15)) {
			if (zone.maxCapacity - zone.population <= 1) continue;
			log(zone.maxCapacity - zone.population);

			world.spawn(
				Mob(),
				CombatStats({
					hp: 100,
					maxHp: 100,
					damage: 5,
				}),
				Transform({
					cf: new CFrame(new Vector3(math.random(-150, 150), 3, math.random(-150, 150))),
				}),
			);

			world.insert(id, zone.patch({ population: zone.population + 1 }));
			log(id, zone.population);
		}
	}

	for (const [id, transform] of world.query(Transform, Mob).without(Renderable)) {
		const model = ReplicatedStorage.Assets.Dummy.Clone();
		model.Parent = Workspace;

		world.insert(
			id,
			Renderable({ model }),
			transform.patch({
				cf: new CFrame(new Vector3(transform.cf.Position.X, 3, transform.cf.Position.Z)),
			}),
		);
		model.SetAttribute("entityId", id);
	}
}

export = {
	system: zonesSpawnMobs,
	after: [removingMissingModels],
};
