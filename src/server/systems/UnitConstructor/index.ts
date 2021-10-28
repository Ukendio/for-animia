import { Fabric, useReplication, useTags, useBatching, NonNullableObject } from "@rbxts/fabric";
import { OnInit, Service } from "@flamework/core";
import { net_remotes } from "shared/Remotes";
import { createUnit } from "./createUnit";

const path_to_units = script.FindFirstChild("general_units")!;
const effect_units_path = script.Parent!.Parent!.FindFirstChild("effect_library")!;

@Service({
	loadOrder: 1,
})
export class UnitConstructor implements OnInit {
	fabric = new Fabric("Game");

	public onInit(): void {
		const fabric = this.fabric;

		useReplication(fabric);
		useTags(fabric);
		useBatching(fabric);
		fabric.registerUnitsIn(path_to_units);
		fabric.registerUnitsIn(effect_units_path);

		fabric.DEBUG = true;
	}

	public create_effect<T extends keyof FabricUnits>(player: Player, name: T, ref: BasePart): void {
		createUnit(this.fabric, name, ref, (...args) => {
			net_remotes.Server.Create("construct_unit").SendToPlayer(player, ...args);
		});
	}
}
