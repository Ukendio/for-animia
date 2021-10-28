import { Fabric, NonNullableObject } from "@rbxts/fabric";
import { ReplicatedStorage } from "@rbxts/services";
import { TLayerData } from "shared/Types";

export function createUnit<T extends keyof FabricUnits, R extends unknown>(
	fabric: Fabric,
	unitResolvable: T,
	ref: R,
	unitBuilder: (unit: T, ref: R) => void,
): T {
	const unit = fabric.getOrCreateUnitByRef(unitResolvable, ref);
	unit.defaults = require(ReplicatedStorage.FindFirstChild("TS")!
		.FindFirstChild("components")!
		.FindFirstChild(`${unitResolvable}Defaults`)! as ModuleScript) as NonNullableObject<TLayerData<T>>;
	unitBuilder(unitResolvable, ref);

	return unitResolvable;
}
