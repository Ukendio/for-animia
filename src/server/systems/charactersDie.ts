import { World } from "@rbxts/matter";
import { Widgets } from "@rbxts/plasma";
import { ServerStorage } from "@rbxts/services";
import { ServerState } from "server/index.server";
import { Body, CombatStats, Renderable, Transform } from "shared/components";

function charactersDie(world: World, _: ServerState, ui: Widgets): void {
	const clicked = ui.button("Die").clicked();
	for (let [id, combatStats, renderable] of world.query(CombatStats, Body)) {
		if (clicked) {
			combatStats = combatStats.patch({ hp: 0 });
		}
		if (combatStats.state && combatStats.state === "Dead") continue;

		if (combatStats.hp <= 0) {
			world.insert(id, combatStats.patch({ state: "Dead" }), Transform({ cf: renderable.model.GetPivot() }));
			renderable.model.Parent = ServerStorage;
		}
	}
}

export = charactersDie;
