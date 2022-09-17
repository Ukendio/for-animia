import { AnyEntity } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { ClientState } from "shared/clientState";
import { start } from "shared/start";
import { receiveReplication } from "./receiveReplication";

const player = Players.LocalPlayer;

const character = (player.Character || player.CharacterAdded.Wait()[0]) as CharacterRigR15;
const overlapParams = new OverlapParams();
const raycastParams = new RaycastParams();

overlapParams.FilterDescendantsInstances = [character];
raycastParams.FilterDescendantsInstances = [character];

const state: ClientState = {
	debugEnabled: true,
	entityIdMap: new Map<string, AnyEntity>(),
	character,
	overlapParams,
	raycastParams,
	controller: {
		actions: [],
	},
};

start([ReplicatedStorage.Client.systems, ReplicatedStorage.Shared.systems], state)(receiveReplication);
