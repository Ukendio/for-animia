-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Transform = _components.Transform
local Renderable = _components.Renderable
local remove_missing_models = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "remove_missing_models").remove_missing_models
local function update_transforms(world)
	for id, transform_record in world:queryChanged(Transform) do
		local renderable = world:get(id, Renderable)
		if not renderable then
			continue
		end
		if not renderable.model.PrimaryPart then
			continue
		end
		if transform_record.new and not transform_record.new.do_not_reconcile then
			renderable.model:SetPrimaryPartCFrame(transform_record.new.cf)
		end
	end
	for id, model_record, transform in world:queryChanged(Renderable) do
		local transform = world:get(id, Transform)
		if not transform then
			continue
		end
		if model_record.new then
			model_record.new.model:SetPrimaryPartCFrame(transform.cf)
		end
	end
end
return {
	system = update_transforms,
	after = { remove_missing_models },
}
