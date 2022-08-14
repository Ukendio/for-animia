import variantModule, { TypeNames, VariantOf } from "@rbxts/variant";

export const InputMapperMessage = variantModule({
	// Sub-messages
	KeyDown: (key: Enum.KeyCode) => ({ key }),
	KeyUp: (key: Enum.KeyCode) => ({ key }),
	// Messages
	DoubleClick: {},
	PointerMove: {},
	PointerClick: {},
});

export type InputMapperMessage<T extends TypeNames<typeof InputMapperMessage> = undefined> = VariantOf<
	typeof InputMapperMessage,
	T
>;
