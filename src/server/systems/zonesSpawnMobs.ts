import { log, useThrottle, World } from "@rbxts/matter";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { CombatStats, Mob, Renderable, Transform, Zone } from "shared/components";
import { setPartCollisionGroup } from "shared/setCharacterCollisionGroup";
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
			if (zone.maxCapacity - zone.population < 1) continue;

			world.spawn(
				Mob({ residentOf: id }),
				CombatStats({
					hp: 100,
					maxHp: 100,
					damage: 5,
				}),
				Transform({
					cf: new CFrame(new Vector3(math.random(-15, 15), 3, math.random(-15, 15))),
				}),
			);

			world.insert(id, zone.patch({ population: zone.population + 1 }));
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
		setPartCollisionGroup(model, "Agency");
	}

	for (const [, mobRecord] of world.queryChanged(Mob)) {
		const zoneId = mobRecord.old?.residentOf;
		if (mobRecord.new === undefined && zoneId) {
			const zone = world.get(zoneId, Zone);
			if (zone) {
				world.insert(zoneId, zone.patch({ population: zone.population - 1 }));
			}
		}
	}
}

export = {
	system: zonesSpawnMobs,
	after: [removingMissingModels],
};
