-- Compiled with roblox-ts v1.3.3-dev-230088d
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
		if v:IsA("BasePart") and v ~= character.PrimaryPart then
			v.CanQuery = false
			v.Transparency = 1
		elseif v:IsA("Decal") then
			v.Transparency = 1
		end
	end
	humanoid.WalkSpeed = 48
	task.delay(duration, function()
		for _, v in character:GetDescendants() do
			if v:IsA("BasePart") and v ~= character.PrimaryPart then
				v.CanQuery = true
				v.Transparency = 0
			elseif v:IsA("Decal") then
				v.Transparency = 0
			end
		end
		humanoid.WalkSpeed = 16
	end)
end
return {
	iFrame = iFrame,
}
