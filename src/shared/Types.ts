import { InferDataType } from "@rbxts/fabric";

export const enum Mode {
	Auto = "Auto",
	Burst = "Burst",
	Semi = "Semi",
}

export interface Config {
	damage: number;
}

export interface MeleeTransmitData {
	origin: CFrame;
	targets: Array<BasePart>;
}

export type TLayerData<T extends keyof FabricUnits> = Required<FabricUnits[T]>["_addLayerData"] extends {}
	? Required<FabricUnits[T]>["_addLayerData"]
	: Partial<InferDataType<T>>;

export const NoSuchThing = "NoSuchThing";
export type NoSuchThing = typeof NoSuchThing;
