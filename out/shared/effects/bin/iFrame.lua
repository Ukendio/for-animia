-- Compiled with roblox-ts v1.3.3-dev-d657049
local function iFrame(duration, source)
	local character = source.Character
	if not character then
		return nil
	end
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if not humanoid then
		return nil
	end
	for _, bodyPart in character:GetDescendants() do
		if not bodyPart:IsA("BasePart") or bodyPart == character.PrimaryPart then
			continue
		end
		bodyPart.Transparency = 1
		bodyPart.CanQuery = false
	end
	humanoid.WalkSpeed = 48
	task.delay(duration, function()
		for _, bodyPart in character:GetDescendants() do
			if not bodyPart:IsA("BasePart") or bodyPart == character.PrimaryPart then
				continue
			end
			bodyPart.Transparency = 0
			bodyPart.CanQuery = true
		end
		humanoid.WalkSpeed = 16
	end)
end
return {
	iFrame = iFrame,
}
