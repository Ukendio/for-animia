import { Players, ReplicatedStorage } from "@rbxts/services";
import { start } from "shared/start";
import { receiveReplication } from "./receiveReplication";

export interface ClientState {
	debugEnabled: boolean;
	character: Model;
	lastInput?: Enum.KeyCode;
}

const player = Players.LocalPlayer;

const state: ClientState = {
	debugEnabled: true,
	character: player.Character || player.CharacterAdded.Wait()[0],
	lastInput: undefined,
};

const [world] = start([ReplicatedStorage.Client.systems, ReplicatedStorage.Shared.systems], state);

receiveReplication(world);
