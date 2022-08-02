import { AnyComponent, AnyEntity, World } from "@rbxts/matter";
import remotes from "shared/remotes";
import * as Components from "shared/components";
import { UnionComponentsMap } from "shared/serde";
import { ComponentCtor } from "@rbxts/matter/lib/component";

const remoteEvent = remotes.Client.Get("Replication");

export function receiveReplication(world: World): void {
	const entityIdMap = new Map<string, AnyEntity>();

	remoteEvent.Connect((entities) => {
		for (const [serverEntityId, componentMap] of entities) {
			let clientEntityId = entityIdMap.get(serverEntityId);

			if (clientEntityId !== undefined && next(componentMap)[0] === undefined) {
				world.despawn(clientEntityId);
				entityIdMap.delete(serverEntityId);
				continue;
			}

			const componentsToInsert = new Array<AnyComponent>();
			const componentsToRemove = new Array<ComponentCtor>();

			const insertNames = new Array<string>();
			const removeNames = new Array<string>();

			for (const [name, container] of componentMap) {
				if (container.data) {
					componentsToInsert.push(Components[name](container.data as UnionComponentsMap));
					insertNames.push(name);
				} else {
					componentsToRemove.push(Components[name]);
					removeNames.push(name);
				}
			}

			if (clientEntityId === undefined) {
				clientEntityId = world.spawn(...componentsToInsert);

				entityIdMap.set(serverEntityId, clientEntityId);
			} else {
				if (componentsToInsert.size() > 0) {
					world.insert(clientEntityId, ...componentsToInsert);
				}

				if (componentsToRemove.size() > 0) {
					world.remove(clientEntityId, ...componentsToRemove);
				}
			}
		}
	});
}
