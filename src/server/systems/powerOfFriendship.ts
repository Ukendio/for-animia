import { World } from "@rbxts/matter";
import { Players, RunService } from "@rbxts/services";
import { Client } from "shared/components";

const bonusPerFriend = 2 / 100;

function powerOfFriendship(world: World): void {
	// We remove dependence on the Players service to make the system mockable.
	// But we use the Players service in the live production.

	const players = RunService.IsStudio()
		? world
				.query(Client)
				.snapshot()
				.mapFiltered(({ player }) => player)
		: Players.GetPlayers();

	for (const [id, client] of world.query(Client)) {
		const clientPlayer = client.player;
		if (!clientPlayer) continue;

		const friends = players.mapFiltered((player) => {
			if (player !== clientPlayer) {
				if (clientPlayer.IsFriendsWith(player.UserId) && player.AccountAge >= 30) {
					return player;
				}
			}
		});

		const amountOfFriends = friends.size();

		world.insert(
			id,
			client.patch({
				document: {
					...client.document,
					rewardsMultiplier: (1 + amountOfFriends * bonusPerFriend) * (client.document!.bonusMultiplier ?? 1),
				},
			}),
		);
	}
}

export = powerOfFriendship;
