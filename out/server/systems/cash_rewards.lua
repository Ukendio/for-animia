-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useThrottle
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Renderable = _components.Renderable
local Target = _components.Target
local function cash_rewards(world)
	for _, _binding in world:query(Renderable, Target) do
		local model = _binding.model
		if useThrottle(60) then
			local player = Players:GetPlayerFromCharacter(model)
			print("give cash to " .. player.Name)
		end
	end
end
return {
	cash_rewards = cash_rewards,
}
