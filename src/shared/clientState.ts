import { AnyEntity } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { Option } from "@rbxts/rust-classes";
import { Effect } from "./components";
import { InputMapperMessage } from "./inputMapperMessage";

export enum PlayerState {
	Invincible,
}

interface CastAbility {
	effect: Effect;
	channelTime: number;
	cooldown: number;
}

export interface ClientState {
	debugEnabled: boolean;
	character: CharacterRigR15;
	commandRecord: { new?: InputMapperMessage; old?: InputMapperMessage };
	entityIdMap: Map<string, AnyEntity>;
	abilities: {
		ability1: Option<CastAbility>;
		ability2: Option<CastAbility>;
		ability3: Option<CastAbility>;
		ability4: Option<CastAbility>;
	};
	skills: {
		dash: CastAbility;
	};
}
