import { World } from "@rbxts/matter";
import { Agency } from "shared/components";
import remotes from "shared/remotes";

const remoteEvent = remotes.Server.Get("TrackLineSight");
print(remoteEvent);
export = (world: World): void => {
	remoteEvent.Connect((player, lineSight) => {
		world.optimizeQueries();

		for (const [id, agency] of world.query(Agency)) {
			if (agency.player === player) {
				world.insert(id, agency.patch({ lineSight }));
				break;
			}
		}
	});
};
