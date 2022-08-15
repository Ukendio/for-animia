-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local PhysicsService = _services.PhysicsService
local ReplicatedStorage = _services.ReplicatedStorage
local t = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "t", "lib", "ts").t
local setPartCollisionGroup = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "setCharacterCollisionGroup").setPartCollisionGroup
local agencyCollisionGroupName = "Agency"
local invincibleCollisionGroupName = "Invincible"
PhysicsService:CreateCollisionGroup(agencyCollisionGroupName)
PhysicsService:CreateCollisionGroup(invincibleCollisionGroupName)
PhysicsService:CollisionGroupSetCollidable(agencyCollisionGroupName, invincibleCollisionGroupName, false)
local physicsGroupCollide = Instance.new("RemoteEvent")
physicsGroupCollide.Name = "PhysicsGroupCollide"
physicsGroupCollide.Parent = ReplicatedStorage
local function setupPhysicsCollisionRemove()
	physicsGroupCollide.OnServerEvent:Connect(function(player, groupName)
		local _arg0 = t.string(groupName)
		assert(_arg0)
		if player.Character then
			setPartCollisionGroup(player.Character, groupName)
		end
	end)
end
return {
	setupPhysicsCollisionRemove = setupPhysicsCollisionRemove,
}
