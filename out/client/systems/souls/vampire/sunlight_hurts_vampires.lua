-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, TS.getModule(script, "@rbxts", "matter").lib).useThrottle
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Lighting = _services.Lighting
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local CombatStats = _components.CombatStats
local Renderable = _components.Renderable
local Soul = _components.Soul
local function sunlight_hurts_vampires(world)
	for _, soul, _binding, combat_stats in world:query(Soul, Renderable, CombatStats) do
		local model = _binding.model
		if soul.name == "Vampire" then
			if useThrottle(0.5) then
				local sun_direction = Lighting:GetSunDirection()
				local raycast_result = Workspace:Raycast(model:GetPivot().Position, sun_direction * 300)
				if raycast_result and raycast_result.Instance then
					continue
				end
				local _result = model:FindFirstChildOfClass("Humanoid")
				if _result ~= nil then
					_result:TakeDamage(5 - combat_stats.damage)
				end
			end
		end
	end
end
return {
	sunlight_hurts_vampires = sunlight_hurts_vampires,
}
