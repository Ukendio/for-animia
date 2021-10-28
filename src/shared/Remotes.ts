import Unit from "@rbxts/fabric/src/FabricLib/Fabric/Unit";
import Net from "@rbxts/net";

export const net_remotes = Net.Definitions.Create({
	construct_unit: Net.Definitions.ServerToClientEvent<[keyof FabricUnits, Unit<keyof FabricUnits>["ref"]]>(),
});
