import { AnyEntity } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { Option } from "@rbxts/rust-classes";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { ClientState } from "shared/clientState";
import { Effect } from "shared/components";
import { EffectVariant } from "shared/effects";
import { start } from "shared/start";
import { receiveReplication } from "./receiveReplication";

const player = Players.LocalPlayer;

const state: ClientState = {
	debugEnabled: true,
	character: (player.Character || player.CharacterAdded.Wait()[0]) as CharacterRigR15,
	entityIdMap: new Map<string, AnyEntity>(),
	commandRecord: {},
	abilities: {
		ability1: Option.some({
			effect: Effect({
				source: player,
				variant: EffectVariant.Dash,
			}),
			channelTime: 0,
			cooldown: 2.5,
		}),
		ability2: Option.some({
			effect: Effect({
				source: player,
				variant: EffectVariant.InvincibilityFrame(0.5),
			}),
			channelTime: 0,
			cooldown: 3,
		}),
		ability3: Option.none(),
		ability4: Option.none(),
	},
	skills: {
		dash: {
			effect: Effect({
				source: player,
				variant: EffectVariant.Dash,
			}),
			channelTime: 0,
			cooldown: 10,
		},
	},
};

start([ReplicatedStorage.Client.systems, ReplicatedStorage.Shared.systems], state)(receiveReplication);
