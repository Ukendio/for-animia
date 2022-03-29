import Net from "@rbxts/net";
import type { SerializedMappedEffect } from "./serde";

export = Net.Definitions.Create({
	CreateFX: Net.Definitions.ClientToServerEvent<[SerializedMappedEffect]>(),
	ReplicateFX: Net.Definitions.ServerToClientEvent<[SerializedMappedEffect]>(),

	CreateFX2: Net.Definitions.ClientToServerEvent<[string, Vector3]>(),
	ReplicateFX2: Net.Definitions.ServerToClientEvent<[string, Vector3]>(),
});
