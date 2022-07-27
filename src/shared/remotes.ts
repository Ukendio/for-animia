import { AnyComponent } from "@rbxts/matter";
import Net from "@rbxts/net";
import { EffectPayload } from "./effects";
import { ComponentNames } from "./serde";

export = Net.CreateDefinitions({
	Replication: Net.Definitions.ServerToClientEvent<[Map<string, Map<ComponentNames, { data: AnyComponent }>>]>(),
	CreateFx: Net.Definitions.ClientToServerEvent<[EffectPayload]>(),
	TrackLineSight: Net.Definitions.ClientToServerEvent<[Vector3]>(),
});
