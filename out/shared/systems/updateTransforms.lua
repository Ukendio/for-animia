-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local RunService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").RunService
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Renderable = _components.Renderable
local Transform = _components.Transform
local function updateTransforms(world)
	for id, transformRecord in world:queryChanged(Transform) do
		if not world:contains(id) then
			continue
		end
		local renderable = world:get(id, Renderable)
		if not renderable then
			continue
		end
		if transformRecord.new and not transformRecord.new.doNotReconcile then
			renderable.model:PivotTo(transformRecord.new.cf)
		end
	end
	for id, renderableRecord in world:queryChanged(Renderable) do
		if not world:contains(id) then
			continue
		end
		local transform = world:get(id, Transform)
		if not transform then
			continue
		end
		if renderableRecord.new then
			renderableRecord.new.model:PivotTo(transform.cf)
		end
	end
	for id, _binding, _binding_1 in world:query(Renderable, Transform) do
		local model = _binding.model
		local cf = _binding_1.cf
		local _result = model.PrimaryPart
		if _result ~= nil then
			_result = _result.Anchored
		end
		if _result then
			continue
		end
		local existingCF = cf
		local currentCF = model:GetPivot()
		if currentCF.Y < -400 then
			world:despawn(id)
			continue
		end
		if currentCF ~= existingCF then
			world:insert(id, Transform({
				cf = currentCF,
				doNotReconcile = true,
			}))
		end
	end
end
return {
	event = if RunService:IsClient() then "fixed" else "default",
	system = updateTransforms,
}
