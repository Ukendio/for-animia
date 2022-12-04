-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local PhysicsService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").PhysicsService
local function setPartCollisionGroup(character, groupName)
	for _, v in character:GetDescendants() do
		if v:IsA("BasePart") then
			PhysicsService:SetPartCollisionGroup(v, groupName)
		end
	end
end
return {
	setPartCollisionGroup = setPartCollisionGroup,
}
