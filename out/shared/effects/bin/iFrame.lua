<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ReplicatedStorage = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").ReplicatedStorage
local physicsGroupCollide = ReplicatedStorage:WaitForChild("PhysicsGroupCollide")
local function iFrame(duration, player)
	local character = player.Character
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
local function iFrame(duration, source)
	local character = source.Character
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
	if not character then
		return nil
	end
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if not humanoid then
		return nil
	end
	for _, v in character:GetDescendants() do
<<<<<<< HEAD
		if v:IsA("BasePart") then
			v.CanQuery = false
			if v ~= character.PrimaryPart then
				v.Transparency = 1
			end
=======
		if v:IsA("BasePart") and v ~= character.PrimaryPart then
			v.CanQuery = false
			v.Transparency = 1
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		elseif v:IsA("Decal") then
			v.Transparency = 1
		end
	end
<<<<<<< HEAD
	physicsGroupCollide:FireServer("Invincible")
	humanoid.WalkSpeed = 48
	task.delay(duration, function()
		for _, v in character:GetDescendants() do
			if v:IsA("BasePart") then
				v.CanQuery = true
				if v ~= character.PrimaryPart then
					v.Transparency = 0
				end
=======
	humanoid.WalkSpeed = 48
	task.delay(duration, function()
		for _, v in character:GetDescendants() do
			if v:IsA("BasePart") and v ~= character.PrimaryPart then
				v.CanQuery = true
				v.Transparency = 0
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
			elseif v:IsA("Decal") then
				v.Transparency = 0
			end
		end
<<<<<<< HEAD
		physicsGroupCollide:FireServer("Agency")
=======
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		humanoid.WalkSpeed = 16
	end)
end
return {
	iFrame = iFrame,
}
