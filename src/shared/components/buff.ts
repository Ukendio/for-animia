import { component } from "@rbxts/matter";
import { variantModule, VariantOf } from "@rbxts/variant";
import { TypeNames } from "@rbxts/variant/out/types";

export const enum BuffKind {
	Regeneration = 1,
	Potion = 2,
	Invulnerability = 3,
	Invisible = 4,
	Poisoned = -1,
}

// We use this to check whether a buff is a Buff or a Debuff
// Every debuff is negative, so we check whether it is less than 0

export function isBuff(buff: BuffKind): boolean {
	return buff < 0;
}

export const BuffCategory = variantModule({
	Natural: {},
	Physical: {},
});

export type BuffCategory<T extends TypeNames<typeof BuffCategory> = undefined> = VariantOf<typeof BuffCategory, T>;

export interface BuffData {
	strength: number;
	duration?: number;
}

export const BuffEffect = variantModule({
	MovementSpeed: (speed: number) => ({ speed }),
});

export type BuffEffect<T extends TypeNames<typeof BuffEffect> = undefined> = VariantOf<typeof BuffEffect, T>;

export const Buff = component<{
	kind: BuffKind;
	data: BuffData;
	cat_ids: Array<BuffCategory>;
	time?: number;
	effects: Array<BuffEffect>;
	source: BuffSource;
}>();
export type Buff = ReturnType<typeof Buff>;

export const BuffSource = variantModule({
	Character: (by: number) => ({ by }),
	World: {},
	Command: {},
	Item: {},
	Buff: {},
	Unknown: {},
});

export type BuffSource<T extends TypeNames<typeof BuffSource> = undefined> = VariantOf<typeof BuffSource, T>;
