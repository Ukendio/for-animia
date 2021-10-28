import { Fabric, useReplication, useTags, useBatching, NonNullableObject } from "@rbxts/fabric";
import { net_remotes } from "shared/Remotes";
import { Controller, OnInit } from "@flamework/core";
import { ReplicatedStorage } from "@rbxts/services";
import { TLayerData } from "shared/Types";

const general_units_path = script.FindFirstChild("general_units")!;
const effect_units_path = script.Parent!.FindFirstChild("EffectEmitter")!.FindFirstChild("effect_units")!;

@Controller({
	loadOrder: 4,
})
export class UnitConstructor implements OnInit {
	onInit() {
		const fabric = new Fabric("Game");

		fabric.DEBUG = true;
		useReplication(fabric);
		useTags(fabric);
		useBatching(fabric);
		fabric.registerUnitsIn(general_units_path);
		fabric.registerUnitsIn(effect_units_path);

		net_remotes.Client.WaitFor("construct_unit").then((r) => {
			r.Connect((unit_resolvable, ref) => {
				const defaults = require(ReplicatedStorage.FindFirstChild("TS")!
					.FindFirstChild("components")!
					.FindFirstChild(`${unit_resolvable}Defaults`)! as ModuleScript) as NonNullableObject<
					TLayerData<typeof unit_resolvable>
				>;
				const c = fabric.getOrCreateUnitByRef(unit_resolvable, ref);
				c.defaults = defaults;
				c.mergeBaseLayer(defaults);
			});
		});
	}
}
