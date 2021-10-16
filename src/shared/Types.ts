import { InferDataType } from "@rbxts/fabric";
import { Vec } from "@rbxts/rust-classes";
import { EFFECT_DECLARATION } from "./effect_library";

export const enum Mode {
	Auto = "Auto",
	Burst = "Burst",
	Semi = "Semi",
}

export interface Config {
	damage: number;
}

export interface MeleeLayerData {
	targets: Array<BasePart>;
	effect_name: keyof EFFECT_DECLARATION;
	effect: (targets: Array<BasePart>) => void;
}

export interface MeleeTransmitData {
	origin: CFrame;
	targets: Array<BasePart>;
	effect_name: keyof EFFECT_DECLARATION;
}

export type TLayerData<T extends keyof FabricUnits> = Required<FabricUnits[T]>["_addLayerData"] extends {}
	? Required<FabricUnits[T]>["_addLayerData"]
	: Partial<InferDataType<T>>;
