-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib")
local useEvent = _matter.useEvent
local useThrottle = _matter.useThrottle
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local HttpService = _services.HttpService
local Players = _services.Players
local UserInputService = _services.UserInputService
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Effect
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects").EffectVariant
local IFRAME_DURATION = 0.5
local COOLDOWN = IFRAME_DURATION + 2.5
local player = Players.LocalPlayer
local function iFrame(world)
	for _, _binding in useEvent(UserInputService, "InputBegan") do
		local KeyCode = _binding.KeyCode
		if KeyCode == Enum.KeyCode.E then
			if useThrottle(COOLDOWN) then
				if not player.Character then
					continue
				end
				world:spawn(Effect({
					source = player,
					variant = EffectVariant.InvincibilityFrame(IFRAME_DURATION),
					predictionGUID = HttpService:GenerateGUID(false),
				}))
			end
		end
	end
end
return {
	event = "fixed",
	system = iFrame,
}
