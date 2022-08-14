-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local HttpService = _services.HttpService
local Players = _services.Players
local UserInputService = _services.UserInputService
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Effect
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects").EffectVariant
local DashDirection = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects", "bin", "dash").DashDirection
local InputMapperMessage = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "inputMapperMessage").InputMapperMessage
local function dashInDirection(world, state)
	if #state.inputBuffer == 0 then
		return nil
	end
	local input = state.inputBuffer[1]
	if input.type == InputMapperMessage.KeyDown.type then
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
		if input.key == Enum.KeyCode.Q then
			world:spawn(Effect({
				source = Players.LocalPlayer,
				variant = EffectVariant.Dash(direction),
				predictionGUID = HttpService:GenerateGUID(false),
			}))
		end
	end
end
return {
	event = "fixed",
	system = dashInDirection,
}
