import { Option } from "@rbxts/rust-classes";

export = identity<FabricUnits["Melee"]>({
	name: "Melee",

	units: {
		Replicated: {},
	},

	onClientMelee: function (this, _, { targets }) {
		this.addLayer("transmit", {
			targets: Option.some(targets),
		});
	},

	effects: [
		function (this) {
			this.get("targets").map((targets) =>
				targets.forEach((h) => {
					(h.Parent?.FindFirstChild("Humanoid") as Humanoid)?.TakeDamage(this.get("damage"));
				}),
			);
		},
	],
});
