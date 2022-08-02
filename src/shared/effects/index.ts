import { variantModule, VariantOf } from "@rbxts/variant";
import { TypeNames } from "@rbxts/variant/out/types";
import { DashDirection } from "./bin/dash";

export type EffectPayload = {
	source?: Player;
	variant: EffectVariant;
	target?: Model;
	pos?: Vector3;
	predictionGUID: string;
};

export const EffectVariant = variantModule({
	Dash: (direction: DashDirection) => ({ direction }),
	Damage: (damage: number) => ({ damage }),
	InvincibilityFrame: (duration: number) => ({ duration }),
});

export type EffectVariant<T extends TypeNames<typeof EffectVariant> = undefined> = VariantOf<typeof EffectVariant, T>;
