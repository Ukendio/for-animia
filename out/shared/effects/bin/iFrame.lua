-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ReplicatedStorage = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").ReplicatedStorage
local physicsGroupCollide = ReplicatedStorage:WaitForChild("PhysicsGroupCollide")
local function iFrame(duration, player)
	local character = player.Character
	if not character then
		return nil
	end
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if not humanoid then
		return nil
	end
	for _, v in character:GetDescendants() do
		if v:IsA("BasePart") then
			v.CanQuery = false
			if v ~= character.PrimaryPart then
				v.Transparency = 1
			end
		elseif v:IsA("Decal") then
			v.Transparency = 1
		end
	end
	physicsGroupCollide:FireServer("Invincible")
	humanoid.WalkSpeed = 48
	task.delay(duration, function()
		for _, v in character:GetDescendants() do
			if v:IsA("BasePart") then
				v.CanQuery = true
				if v ~= character.PrimaryPart then
					v.Transparency = 0
				end
			elseif v:IsA("Decal") then
				v.Transparency = 0
			end
		end
		physicsGroupCollide:FireServer("Agency")
		humanoid.WalkSpeed = 16
	end)
end
return {
	iFrame = iFrame,
}
