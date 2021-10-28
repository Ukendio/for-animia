import { Option } from "@rbxts/rust-classes";
import { Players } from "@rbxts/services";

export = identity<FabricUnits["BasicPunch"]>({
	name: "BasicPunch",

	units: {
		Replicated: {},
		Melee: {
			targets: Option.none(),
			origin: Option.none(),
			damage: 15,
		},
	},

	onClientEmit_basic_punch: function (this, original_caster, data): void {
		const transmitter = this.getUnit("Transmitter")!;

		for (const player of Players.GetPlayers()) {
			if (original_caster !== player) {
				transmitter.sendTo(player, "emit_basic_punch", data);
			}
		}
	},
});
