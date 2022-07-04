-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
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
end
return updateTransforms
