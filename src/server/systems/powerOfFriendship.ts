import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Agency } from "shared/components";

const bonusPerFriend = 2 / 100;

function powerOfFriendship(world: World): void {
	for (const [id, agency] of world.query(Agency)) {
		const userId = agency.player.UserId;
		const friends = Players.GetPlayers().mapFiltered((player) => {
			if (player === agency.player) return;

			if (player.IsFriendsWith(userId) && player.AccountAge > 30) {
				return player;
			}
		});

		const amountOfFriends = friends.size();

		world.insert(id, agency.patch({ rewardsMultiplier: 1 + amountOfFriends * bonusPerFriend }));
	}
}

export = powerOfFriendship;
