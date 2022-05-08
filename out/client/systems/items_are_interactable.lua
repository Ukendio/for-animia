-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useEvent
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Target = _components.Target
local Renderable = _components.Renderable
local CombatStats = _components.CombatStats
local Item = _components.Item
local WantsPickUp = _components.WantsPickUp
local Prompt = _components.Prompt
local function items_are_interactable(world)
	for player_entity in world:query(Target, Renderable, CombatStats) do
		for item_entity, _binding in world:query(Prompt, Item, Renderable) do
			local prompt = _binding.prompt
			for _ in useEvent(prompt, "Triggered") do
				world:insert(player_entity, WantsPickUp({
					collected_by = player_entity,
					item = item_entity,
				}))
			end
		end
	end
end
return {
	items_are_interactable = items_are_interactable,
}
