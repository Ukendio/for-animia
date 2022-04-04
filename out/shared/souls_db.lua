-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Vec = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Vec
local souls_db = {
	Deku = {
		abilities = {
			["Detroit Smash"] = {
				base_damage = Vec:fromPtr({ 10, 20, 30 }),
			},
		},
		evolutions = Vec:fromPtr({}),
	},
	["Fire Person"] = {
		abilities = {
			Fireball = {
				base_damage = Vec:fromPtr({ 10, 20, 30 }),
			},
		},
		evolutions = Vec:fromPtr({}),
	},
	Grappler = {
		abilities = {
			["Detroit Smash"] = {},
		},
		evolutions = Vec:fromPtr({}),
	},
	Gray = {
		abilities = {
			["Detroit Smash"] = {},
		},
		evolutions = Vec:fromPtr({}),
	},
	Vampire = {
		abilities = {
			["Detroit Smash"] = {},
		},
		evolutions = Vec:fromPtr({}),
	},
}
return {
	souls_db = souls_db,
}
