import { Fabric, useReplication, useTags, useBatching } from "@rbxts/fabric";
import { OnInit, Service } from "@flamework/core";
import { net_remotes } from "shared/Remotes";
import { createUnit } from "./createUnit";
import { Config } from "shared/Types";
import { EFFECT_DECLARATION } from "shared/effect_library";

const path_to_units = script.Parent!.Parent!.FindFirstChild("units")!;
@Service({})
export class UnitConstructor implements OnInit {
	fabric = new Fabric("Game");

	public onInit(): void {
		const fabric = this.fabric;

		useReplication(fabric);
		useTags(fabric);
		useBatching(fabric);
		fabric.registerUnitsIn(path_to_units);
		fabric.DEBUG = true;
	}

	public create_melee(
		player: Player,
		ref: BasePart,
		defaults: Config & {
			effect_name: keyof EFFECT_DECLARATION;
		},
	): void {
		createUnit(this.fabric, "Melee", ref, defaults, (...args) => {
			net_remotes.Server.Create("construct_unit").SendToPlayer(player, ...args);
		});
	}
}
