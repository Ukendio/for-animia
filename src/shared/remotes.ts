import Net from "@rbxts/net";

import type { SerializedMappedEffect } from "./serde";

export const remotes = Net.Definitions.Create({
	create_fx: Net.Definitions.ClientToServerEvent<[SerializedMappedEffect]>(),
	replicate_fx: Net.Definitions.ServerToClientEvent<[SerializedMappedEffect]>(),
});
