import variantModule, { TypeNames, VariantOf } from "@rbxts/variant";

export const InputKind = variantModule({
	// Sub-messages
	KeyDown: (key: Enum.KeyCode) => ({ key }),
	KeyUp: (key: Enum.KeyCode) => ({ key }),
	Hold: (duration: number) => ({ duration }),

	// Messages
	HoldRelease: {},
	DoubleClick: {},
	PointerMove: {},
	PointerClick: {},
});

export type InputKind<T extends TypeNames<typeof InputKind> = undefined> = VariantOf<typeof InputKind, T>;
