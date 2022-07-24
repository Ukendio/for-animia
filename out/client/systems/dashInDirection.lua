-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useEvent
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local HttpService = _services.HttpService
local Players = _services.Players
local UserInputService = _services.UserInputService
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Effect
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects").EffectVariant
local DashDirection = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects", "bin", "dash").DashDirection
local function dashInDirection(world, state)
	for _, _binding, gameProcessedEvent in useEvent(UserInputService, "InputBegan") do
		local KeyCode = _binding.KeyCode
		if gameProcessedEvent then
			continue
		end
		local direction = DashDirection.Forward
		if UserInputService:IsKeyDown(Enum.KeyCode.A) then
			direction = DashDirection.Left
		end
		if UserInputService:IsKeyDown(Enum.KeyCode.S) then
			direction = DashDirection.Back
		end
		if UserInputService:IsKeyDown(Enum.KeyCode.D) then
			direction = DashDirection.Right
		end
		if UserInputService.MouseBehavior ~= Enum.MouseBehavior.LockCenter then
			direction = DashDirection.Forward
		end
		if KeyCode == Enum.KeyCode.Q then
			world:spawn(Effect({
				source = Players.LocalPlayer,
				variant = EffectVariant.Dash(direction),
				predictionGUID = HttpService:GenerateGUID(false),
			}))
		end
		state.lastInput = KeyCode
	end
end
return {
	event = "fixed",
	system = dashInDirection,
}
