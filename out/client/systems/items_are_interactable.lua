-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").lib).useEvent
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Renderable = _components.Renderable
local Item = _components.Item
local Prompt = _components.Prompt
local function items_are_interactable(world, _, agency)
	for item_entity, _binding in world:query(Prompt, Item, Renderable) do
		local prompt = _binding.prompt
		for _ in useEvent(prompt, "Triggered") do
		end
	end
end
return {
	items_are_interactable = items_are_interactable,
}
