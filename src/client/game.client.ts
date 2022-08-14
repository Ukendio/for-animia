import { AnyEntity } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { ClientState } from "shared/playerState";
import { start } from "shared/start";
import { receiveReplication } from "./receiveReplication";

const player = Players.LocalPlayer;

const state: ClientState = {
	debugEnabled: true,
	character: (player.Character || player.CharacterAdded.Wait()[0]) as CharacterRigR15,
	inputBuffer: [],
	entityIdMap: new Map<string, AnyEntity>(),
};

start([ReplicatedStorage.Client.systems, ReplicatedStorage.Shared.systems], state)(receiveReplication);
