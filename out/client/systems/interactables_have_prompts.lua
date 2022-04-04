-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Item = _components.Item
local Renderable = _components.Renderable
local Prompt = _components.Prompt
local function InteractablesHavePrompt(world, state)
	for id, _, _binding in world:query(Item, Renderable):without(Prompt) do
		local model = _binding.model
		local prompt = Instance.new("ProximityPrompt")
		prompt.Parent = model
		prompt.KeyboardKeyCode = state.interact
		world:insert(id, Prompt({
			prompt = prompt,
		}))
	end
end
return {
	InteractablesHavePrompt = InteractablesHavePrompt,
}
