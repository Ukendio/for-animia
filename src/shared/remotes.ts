import { AnyEntity } from "@rbxts/matter";
import Net from "@rbxts/net";
import { SerializedEffect } from "./effects_db";

export = Net.Definitions.Create({
	CreateFX: Net.Definitions.ClientToServerEvent<[string, Vector3]>(),
	CreateFX2: Net.Definitions.ClientToServerEvent<[SerializedEffect]>(),
	ReplicateFX: Net.Definitions.ServerToClientEvent<[string, Vector3]>(),
	ReplicateFX2: Net.Definitions.ServerToClientEvent<[SerializedEffect]>(),
});
