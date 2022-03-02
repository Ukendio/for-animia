import Net from "@rbxts/net";

export = Net.Definitions.Create({
	CreateFX: Net.Definitions.ClientToServerEvent<[string, CFrame]>(),
	ReplicateFX: Net.Definitions.ServerToClientEvent<[string, CFrame]>(),
});
