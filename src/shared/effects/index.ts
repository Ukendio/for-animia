import { variantModule, VariantOf } from "@rbxts/variant";
import { TypeNames } from "@rbxts/variant/out/types";

export type EffectPayload = {
	source: Player;
	variant: EffectVariant;
	target?: Model;
	pos?: Vector3;
	predictionGUID?: string;
};

export const EffectVariant = variantModule({
	Dash: {},
	Damage: (damage: number) => ({ damage }),
	InvincibilityFrame: (duration: number) => ({ duration }),
});

export type EffectVariant<T extends TypeNames<typeof EffectVariant> = undefined> = VariantOf<typeof EffectVariant, T>;
