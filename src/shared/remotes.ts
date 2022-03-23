import Net from "@rbxts/net";

export = Net.Definitions.Create({
	CreateFX: Net.Definitions.ClientToServerEvent<[string, Vector3]>(),
	ReplicateFX: Net.Definitions.ServerToClientEvent<[string, Vector3]>(),
});
