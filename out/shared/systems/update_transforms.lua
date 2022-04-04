-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Transform = _components.Transform
local Renderable = _components.Renderable
local remove_missing_models = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "remove_missing_models").remove_missing_models
local function update_transforms(world)
	for _, transform_record, _binding in world:queryChanged(Transform, Renderable) do
		local model = _binding.model
		if not model.PrimaryPart then
			continue
		end
		if transform_record.new and not transform_record.new.do_not_reconcile then
			model:SetPrimaryPartCFrame(transform_record.new.cf)
		end
	end
	for _, model_record, transform in world:queryChanged(Renderable, Transform) do
		if model_record.new then
			model_record.new.model:SetPrimaryPartCFrame(transform.cf)
		end
	end
	for id, _binding, transform in world:query(Renderable, Transform) do
		local model = _binding.model
		local existing_cf = transform.cf
		local _current_cf = model.PrimaryPart
		if _current_cf ~= nil then
			_current_cf = _current_cf.CFrame
		end
		local current_cf = _current_cf
		if current_cf and current_cf ~= existing_cf then
			world:insert(id, Transform({
				cf = current_cf,
			}))
		end
	end
end
return {
	system = update_transforms,
	after = { remove_missing_models },
}
