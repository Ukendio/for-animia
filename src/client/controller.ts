import { variantModule, VariantOf } from "@rbxts/variant";
import { TypeNames } from "@rbxts/variant/out/types";

export const ControlEvent = variantModule({});

export type ControlEvent<T extends TypeNames<typeof ControlEvent> = undefined> = VariantOf<typeof ControlEvent, T>;
