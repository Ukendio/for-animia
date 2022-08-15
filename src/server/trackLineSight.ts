import { World } from "@rbxts/matter";
<<<<<<< HEAD
import { ReplicatedStorage } from "@rbxts/services";
import { t } from "@rbxts/t";
import { Agency } from "shared/components";

const remoteEvent = new Instance("RemoteEvent");
remoteEvent.Name = "TrackLineOfSight";
remoteEvent.Parent = ReplicatedStorage;

function trackLineSight(world: World): void {
	remoteEvent.OnServerEvent.Connect((player, lineSight) => {
		assert(t.Vector3(lineSight));

=======
import { Agency } from "shared/components";
import remotes from "shared/remotes";

const remoteEvent = remotes.Server.Get("TrackLineSight");

export = (world: World): void => {
	remoteEvent.Connect((player, lineSight) => {
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		world.optimizeQueries();

		for (const [id, agency] of world.query(Agency)) {
			if (agency.player === player) {
<<<<<<< HEAD
				world.insert(id, agency.patch({ lineSight: lineSight }));
=======
				world.insert(id, agency.patch({ lineSight }));
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
				break;
			}
		}
	});
<<<<<<< HEAD
}

export = trackLineSight;
=======
};
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
