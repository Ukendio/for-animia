-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").lib).useEvent
local Renderable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").Renderable
local function remove_missing_models(world)
	for id, _binding in world:query(Renderable) do
		local model = _binding.model
		for _ in useEvent(model, "AncestryChanged") do
			if model:IsDescendantOf(game) == false then
				world:remove(id, Renderable)
				break
			end
			if not model.PrimaryPart then
				world:remove(id, Renderable)
			end
		end
	end
	for _, model_record in world:queryChanged(Renderable) do
		if model_record.new == nil then
			if model_record.old and model_record.old.model then
				model_record.old.model:Destroy()
			end
		end
	end
end
return {
	remove_missing_models = remove_missing_models,
}
