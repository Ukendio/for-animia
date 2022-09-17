import { variantModule, VariantOf } from "@rbxts/variant";
import { TypeNames } from "@rbxts/variant/out/types";
import { Damage } from "shared/combat";
import { BuffEffect } from "./components/buff";
import { HealthChange } from "./components/health";

export const Effect = variantModule({
	Health: (comp: HealthChange) => comp,
	Poise: (amount: number) => ({ amount }),
	Damage: (comp: Damage) => comp,
	Buff: (comp: BuffEffect) => comp,
});

export type Effect<T extends TypeNames<typeof Effect> = undefined> = VariantOf<typeof Effect, T>;
