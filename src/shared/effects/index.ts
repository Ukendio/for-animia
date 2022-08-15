import { variantModule, VariantOf } from "@rbxts/variant";
import { TypeNames } from "@rbxts/variant/out/types";
<<<<<<< HEAD

export type EffectPayload = {
	source: Player;
	variant: EffectVariant;
	target?: Model;
	pos?: Vector3;
	predictionGUID?: string;
};

export const EffectVariant = variantModule({
	Dash: {},
=======
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
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
	Damage: (damage: number) => ({ damage }),
	InvincibilityFrame: (duration: number) => ({ duration }),
});

export type EffectVariant<T extends TypeNames<typeof EffectVariant> = undefined> = VariantOf<typeof EffectVariant, T>;
