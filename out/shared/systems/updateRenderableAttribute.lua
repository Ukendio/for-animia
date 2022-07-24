-- Compiled with roblox-ts v1.3.3-dev-d657049
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
