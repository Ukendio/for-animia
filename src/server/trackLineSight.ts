import { World } from "@rbxts/matter";
import { ReplicatedStorage } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Agency } from "shared/components";

const remoteEvent = new Instance("RemoteEvent");
remoteEvent.Name = "TrackLineOfSight";
remoteEvent.Parent = ReplicatedStorage;

function trackLineSight(world: World): void {
	remoteEvent.OnServerEvent.Connect((player, lineSight) => {
		assert(t.Vector3(lineSight));

		world.optimizeQueries();

		for (const [id, agency] of world.query(Agency)) {
			if (agency.player === player) {
				world.insert(id, agency.patch({ lineSight: lineSight }));
				break;
			}
		}
	});
}

export = trackLineSight;
