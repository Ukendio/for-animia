-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local log = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").log
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local HttpService = _services.HttpService
local Players = _services.Players
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Effect
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects").EffectVariant
local InputMapperMessage = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "inputMapperMessage").InputMapperMessage
local player = Players.LocalPlayer
local mouse = player:GetMouse()
local function attack(world, state)
	if #state.inputBuffer == 0 then
		return nil
	end
	local input = state.inputBuffer[1]
	if input.type == InputMapperMessage.PointerClick.type then
		log(input)
		local _result = mouse.Target
		if _result ~= nil then
			_result = _result.Parent
		end
		local target = _result
		local _result_1 = target
		if _result_1 ~= nil then
			_result_1 = _result_1:FindFirstChild("Humanoid")
		end
		if _result_1 then
			local _position = state.character:GetPivot().Position
			local _position_1 = target:GetPivot().Position
			if (_position - _position_1).Magnitude < 12 then
				world:spawn(Effect({
					predictionGUID = HttpService:GenerateGUID(false),
					variant = EffectVariant.Damage(10),
					target = target,
					source = Players.LocalPlayer,
				}))
			end
		end
		table.remove(state.inputBuffer, 1)
	end
end
return {
	event = "fixed",
	system = attack,
}
