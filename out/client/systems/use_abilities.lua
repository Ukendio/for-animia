-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useEvent
local UserInputService = TS.import(script, TS.getModule(script, "@rbxts", "services")).UserInputService
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local CombatStats = _components.CombatStats
local Renderable = _components.Renderable
local Soul = _components.Soul
local UseAbility = _components.UseAbility
local function use_abilities(world, controls, agency)
	for id in world:query(Soul, Renderable, CombatStats) do
		if agency.id == id then
			for _, _binding in useEvent(UserInputService, "InputBegan") do
				local KeyCode = _binding.KeyCode
				if KeyCode == controls.use_ability_1 or (KeyCode == controls.use_ability_2 or (KeyCode == controls.use_ability_3 or KeyCode == controls.use_ability_4)) then
					world:insert(id, UseAbility({
						key_code = KeyCode,
					}))
				end
			end
		end
	end
end
return {
	use_abilities = use_abilities,
}
