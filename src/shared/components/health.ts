import { component } from "@rbxts/matter";
import { HashMap, Option } from "@rbxts/rust-classes";
import { DamageContributor, DamageSource } from "shared/combat";

export const Health = component<{
	current: number;
	baseMax: number;
	maximum: number;

	lastChange: HealthChange;
	isDead: boolean;

	damageContributors: HashMap<DamageContributor, [number, number]>;
}>("Health");
export type Health = ReturnType<typeof Health>;

export interface HealthChange {
	amount: number;
	by: Option<DamageContributor>;
	cause: Option<DamageSource>;
	time: number;
	crit: boolean;
}
