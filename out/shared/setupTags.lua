-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Renderable = _components.Renderable
local Transform = _components.Transform
local CollectionService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").CollectionService
local boundTags = {}
local function setupTags(world)
	local function spawnBound(model, component)
		local id = world:spawn(component(), Renderable({
			model = model,
		}), Transform({
			cf = model:GetPivot(),
		}))
		model:SetAttribute("serverEntityId", id)
	end
	for component in boundTags do
		local tagName = tostring(component)
		for _, instance in CollectionService:GetTagged(tagName) do
			spawnBound(instance, component)
		end
		CollectionService:GetInstanceAddedSignal(tagName):Connect(function(instance)
			spawnBound(instance, component)
		end)
		CollectionService:GetInstanceRemovedSignal(tagName):Connect(function(instance)
			local id = instance:GetAttribute("serverEntityId")
			if id ~= nil then
				world:despawn(id)
			end
		end)
	end
end
return {
	setupTags = setupTags,
}
