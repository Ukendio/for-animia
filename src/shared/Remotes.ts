import { EFFECT_DECLARATION } from "shared/effect_library";

import { NonNullableObject } from "@rbxts/fabric";
import Unit from "@rbxts/fabric/src/FabricLib/Fabric/Unit";
import { TLayerData } from "shared/Types";
import Net from "@rbxts/net";

export const net_remotes = Net.Definitions.Create({
	construct_unit:
		Net.Definitions.ServerToClientEvent<
			[keyof FabricUnits, Unit<keyof FabricUnits>["ref"], NonNullableObject<TLayerData<keyof FabricUnits>>]
		>(),
	broadcast_effect:
		Net.Definitions.ServerToClientEvent<
			[keyof EFFECT_DECLARATION, Parameters<EFFECT_DECLARATION[keyof EFFECT_DECLARATION]>]
		>(),
});
