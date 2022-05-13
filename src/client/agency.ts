import { GenericOfComponent } from "@rbxts/matter";
import { CombatStats } from "shared/components";

export interface Agency {
	in_anim: false;
	combat_stats: GenericOfComponent<CombatStats>;
}

const agency: Agency = {
	in_anim: false,
	combat_stats: {
		hp: 100,
		max_hp: 100,
		damage: 10,
		defense: 10,
		soul_power: 10,
	},
};
