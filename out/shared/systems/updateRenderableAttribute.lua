<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local RunService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").RunService
local Renderable = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Renderable
local name = if RunService:IsServer() then "serverEntityId" else "clientEntityId"
local function updateRenderableAttribute(world)
	for id, record in world:queryChanged(Renderable) do
		if record.new then
			record.new.model:SetAttribute(name, id)
		end
	end
end
return updateRenderableAttribute
