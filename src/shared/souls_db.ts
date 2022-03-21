import { Vec } from "@rbxts/rust-classes";

export const souls_db = {
	["Deku"]: {
		abilities: {
			["Detroit Smash"]: {
				base_damage: Vec.fromPtr([10, 20, 30]),
			},
		},
		evolutions: Vec.fromPtr([]),
	},
	["Vampire"]: {
		abilities: {
			["Detroit Smash"]: {},
		},
		evolutions: Vec.fromPtr([]),
	},
	["Grappler"]: {
		abilities: {
			["Detroit Smash"]: {},
		},
		evolutions: Vec.fromPtr([]),
	},
	["Gray"]: {
		abilities: {
			["Detroit Smash"]: {},
		},
		evolutions: Vec.fromPtr([]),
	},
};
