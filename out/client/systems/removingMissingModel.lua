-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useEvent
local Renderable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").Renderable
local function removingMissingModel(world)
	for id, _binding in world:query(Renderable) do
		local model = _binding.model
		for _ in useEvent(model, "AncestryChanged") do
			if model:IsDescendantOf(game) == false then
				world:remove(id)
				break
			end
		end
		if not model.PrimaryPart then
			world:remove(id, Renderable)
		end
	end
	for _, modelRecord in world:queryChanged(Renderable) do
		if modelRecord.new == nil then
			if modelRecord.old and modelRecord.old.model then
				modelRecord.old.model:Destroy()
			end
		end
	end
end
return removingMissingModel
