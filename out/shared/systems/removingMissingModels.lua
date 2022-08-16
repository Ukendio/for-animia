<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useEvent
local RunService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").RunService
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useEvent
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local Renderable = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Renderable
local function removingMissingModels(world)
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
return {
<<<<<<< HEAD
	event = if RunService:IsClient() then "fixed" else "default",
=======
	event = "fixed",
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
	system = removingMissingModels,
}
