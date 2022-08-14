-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useThrottle
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local HttpService = _services.HttpService
local Players = _services.Players
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Effect
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects").EffectVariant
local InputMapperMessage = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "inputMapperMessage").InputMapperMessage
local IFRAME_DURATION = 0.5
local COOLDOWN = IFRAME_DURATION + 2.5
local player = Players.LocalPlayer
local function iFrame(world, state)
	if #state.inputBuffer == 0 then
		return nil
	end
	local input = state.inputBuffer[1]
	if input.type == InputMapperMessage.KeyDown.type and input.key == Enum.KeyCode.E then
		if useThrottle(COOLDOWN) then
			if not player.Character then
				return nil
			end
			world:spawn(Effect({
				source = Players.LocalPlayer,
				variant = EffectVariant.InvincibilityFrame(IFRAME_DURATION),
				predictionGUID = HttpService:GenerateGUID(false),
			}))
		end
	end
end
return {
	event = "fixed",
	system = iFrame,
}
