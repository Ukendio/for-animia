-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Option = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "rust-classes", "out").Option
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Effect
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects").EffectVariant
local start = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "start").start
local receiveReplication = TS.import(script, game:GetService("ReplicatedStorage"), "Client", "receiveReplication").receiveReplication
local player = Players.LocalPlayer
local state = {
	debugEnabled = true,
	character = (player.Character or (player.CharacterAdded:Wait())),
	entityIdMap = {},
	commandRecord = {},
	abilities = {
		ability1 = Option:some({
			effect = Effect({
				source = player,
				variant = EffectVariant.Dash,
			}),
			channelTime = 0,
			cooldown = 2.5,
		}),
		ability2 = Option:some({
			effect = Effect({
				source = player,
				variant = EffectVariant.InvincibilityFrame(0.5),
			}),
			channelTime = 0,
			cooldown = 3,
		}),
		ability3 = Option:none(),
		ability4 = Option:none(),
	},
	skills = {
		dash = {
			effect = Effect({
				source = player,
				variant = EffectVariant.Dash,
			}),
			channelTime = 0,
			cooldown = 10,
		},
	},
}
start({ ReplicatedStorage.Client.systems, ReplicatedStorage.Shared.systems }, state)(receiveReplication)
