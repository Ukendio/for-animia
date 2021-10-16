import { Fabric, useReplication, useTags, useBatching } from "@rbxts/fabric";
import { net_remotes } from "shared/Remotes";
import { Controller, OnInit } from "@flamework/core";

const path_to_units = script.Parent!.Parent!.FindFirstChild("units")!;

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
		fabric.registerUnitsIn(path_to_units);

		net_remotes.Client.WaitFor("construct_unit").then((r) => {
			r.Connect((unit_resolvable, ref, defaults) => {
				print(unit_resolvable);
				const c = fabric.getOrCreateUnitByRef(unit_resolvable, ref);
				c.defaults = defaults;
				c.mergeBaseLayer(defaults);
			});
		});
	}
}
