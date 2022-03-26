-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useEvent
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local UserInputService = _services.UserInputService
local fireball = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "effects", "fireball").fireball
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Renderable = _components.Renderable
local Soul = _components.Soul
local function spawn_fireball(world, controls)
	for id, _binding, soul in world:query(Renderable, Soul) do
		local model = _binding.model
		if soul.name ~= "Fire Person" then
			continue
		end
		for _, _binding_1 in useEvent(UserInputService, "InputBegan") do
			local KeyCode = _binding_1.KeyCode
			if KeyCode == controls.use_ability_1 then
				local cf = model:GetPivot()
				local goal = Players:GetPlayerFromCharacter(model):GetMouse().Hit.Position
				fireball(world, Option:some(id), cf, goal)
			end
		end
	end
end
return {
	spawn_fireball = spawn_fireball,
}
