import { net_remotes } from "shared/Remotes";

export = identity<FabricUnits["Melee"]>({
	name: "Melee",

	units: {
		Replicated: {},
	},

	onClientMelee: function (this, player, { origin, targets, effect_name }) {
		this.addLayer("transmit", {
			targets,
		});

		net_remotes.Server.Create("broadcast_effect").SendToAllPlayersExcept(player, effect_name, [
			player.Character?.FindFirstChild("Humanoid")!.FindFirstChild("Animator") as Animator,
			origin,
			targets,
		]);
	},

	effects: [
		function (this) {
			this.get("targets").forEach((h) => {
				(h.Parent?.FindFirstChild("Humanoid") as Humanoid)?.TakeDamage(this.get("damage"));
			});
		},
	],
});
