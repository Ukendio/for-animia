import { CharacterRigR15 } from "@rbxts/promise-character";
import { Option, Vec } from "@rbxts/rust-classes";

export const BasicPunchDefaults = {
	animation_index: 0,
	caster: Option.none<CharacterRigR15>(),
	origin: Option.none<CFrame>(),
	targets: Option.none<Vec<BasePart>>(),
};

export type BasicPunchDefaults = typeof BasicPunchDefaults;
