import { AnyComponent, World } from "@rbxts/matter";
import * as Components from "shared/components";
import { ComponentNames, UnionComponentsMap } from "shared/serde";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { ReplicatedStorage } from "@rbxts/services";
import { t } from "@rbxts/t";
import { ClientState } from "shared/playerState";

const remoteEvent = ReplicatedStorage.WaitForChild("Replication") as RemoteEvent;

export function receiveReplication(world: World, state: ClientState): void {
	const entityIdMap = state.entityIdMap;

	remoteEvent.OnClientEvent.Connect((entities: Map<string, Map<ComponentNames, { data: AnyComponent }>>) => {
		assert(t.map(t.string, t.table)(entities));

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
