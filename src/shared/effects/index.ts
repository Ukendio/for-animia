import { Option } from "@rbxts/rust-classes";
import { variantModule, VariantOf } from "@rbxts/variant";
import { TypeNames } from "@rbxts/variant/out/types";

export type EffectPayload = {
	creator: Option<Player>;
	variant: EffectVariant;
	target: Option<Model>;
	pos: Option<Vector3>;
};

export const EffectVariant = variantModule({
	Damage: (damage: number) => ({ damage }),
	Explosion: (size: NumberSequence) => ({ size }),
	KnockBack: (force: Vector3) => ({ force }),
	Slow: (slow: number) => ({ slow }),
	Track: (attach: Vector3) => ({ attach }),
	Stun: (duration: number) => ({ duration }),
});

export type EffectVariant<T extends TypeNames<typeof EffectVariant> = undefined> = VariantOf<typeof EffectVariant, T>;
