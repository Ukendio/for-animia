import { log, useThrottle, World } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
import { CombatStats, Agent, Renderable, Transform, Zone, Collision, Body } from "shared/components";
import { setPartCollisionGroup } from "shared/setCharacterCollisionGroup";
import removingMissingModels from "shared/systems/removingMissingModels";

function heightFromGround(root?: BasePart): number {
	let height = 2.7;
	if (root) {
		height = height - 1.25 * (2 - root.Size.Y);
	}
	return height;
}

function zonesSpawnAgents(world: World): void {
	for (const [id, zone, { cf }, { size }] of world.query(Zone, Transform, Collision)) {
		if (useThrottle(15)) {
			if (zone.maxCapacity - zone.population < 1) continue;

			world.spawn(
				Agent({ residentOf: id }),
				CombatStats({
					hp: 100,
					maxHp: 100,
					damage: 5,
				}),
				Transform({
					cf: cf.add(new Vector3(math.random(-size.X, size.X), 3, math.random(-size.Z, size.Z))),
				}),
			);

			world.insert(id, zone.patch({ population: zone.population + 1 }));
		}
	}

	for (const [id, transform] of world.query(Transform, Agent).without(Body)) {
		const model = ReplicatedStorage.Assets.Dummy.Clone() as unknown as CharacterRigR15;
		const cf = new CFrame(new Vector3(transform.cf.Position.X, 3, transform.cf.Position.Z));
		model.PivotTo(cf);
		model.Parent = Workspace;

		world.insert(id, Body({ model: model }), transform.patch({ cf }));
		model.SetAttribute("entityId", id);
		setPartCollisionGroup(model, "Agency");
	}

	for (const [, mobRecord] of world.queryChanged(Agent)) {
		const zoneId = mobRecord.old?.residentOf;
		if (!mobRecord.new && zoneId) {
			const zone = world.get(zoneId, Zone);
			if (zone) {
				world.insert(zoneId, zone.patch({ population: zone.population - 1 }));
			}
		}
	}
}

export = {
	system: zonesSpawnAgents,
	after: [removingMissingModels],
};
