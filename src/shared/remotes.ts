import Net from "@rbxts/net";
import { MappedEffect } from "./effects_db";
import type { SerializedMappedEffect } from "./serde";

export = Net.Definitions.Create({
	CreateFX: Net.Definitions.ClientToServerEvent<[string, Vector3]>(),
	CreateFX2: Net.Definitions.ClientToServerEvent<[SerializedMappedEffect]>(),
	ReplicateFX: Net.Definitions.ServerToClientEvent<[string, Vector3]>(),
	ReplicateFX2: Net.Definitions.ServerToClientEvent<[MappedEffect]>(),
});
