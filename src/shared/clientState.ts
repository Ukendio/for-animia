import { AnyEntity } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { InputKind } from "./inputMapperMessage";

export enum PlayerState {
	Invincible,
}

export interface ClientState {
	debugEnabled: boolean;
	character: CharacterRigR15;
	isJumping: boolean;
	isRunning: boolean;
	lastProcessedCommand?: InputKind;
	entityIdMap: Map<string, AnyEntity>;
	overlapParams: OverlapParams;
	raycastParams: RaycastParams;
	controller: {
		actions: Array<unknown>;
	};
	promptKeyboardKeyCode: Enum.KeyCode;
}
