import { AnyEntity } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { InputMapperMessage } from "./inputMapperMessage";

export enum PlayerState {
	Invincible,
}

export interface ClientState {
	debugEnabled: boolean;
	character: CharacterRigR15;
	inputBuffer: Array<InputMapperMessage>;
	entityIdMap: Map<string, AnyEntity>;
}
