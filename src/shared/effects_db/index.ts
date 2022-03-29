import { AnyEntity } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { variantModule, VariantOf } from "@rbxts/variant";
import { TypeNames } from "@rbxts/variant/out/types";

export type EffectPayload = {
	creator: Option<AnyEntity>;
	variant: EffectVariant;
	target: Option<AnyEntity>;
	pos: Option<Vector3>;
};

export const EffectVariant = variantModule({
	Damage: (damage: number) => ({ damage }),
	Explosion: (size: NumberSequence) => ({ size }),
	KnockBack: (force: Vector3) => ({ force }),
	Slow: (slow: number) => ({ slow }),
	Track: (attach: Vector3) => ({ attach }),
});

export type EffectVariant<T extends TypeNames<typeof EffectVariant> = undefined> = VariantOf<typeof EffectVariant, T>;
