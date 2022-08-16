<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
-- Original Author by Sircfenner
local Provider = game:GetService("KeyframeSequenceProvider")
local cache = {}
local function getAnimationLength(animation)
	local assetId = animation.AnimationId
	if cache[assetId] ~= nil then
		return cache[assetId]
	end
	local sequence = Provider:GetKeyframeSequenceAsync(assetId)
	local keyframes = sequence:GetKeyframes()
	local length = 0
	for i = 1, #keyframes do
		local time = keyframes[i - 1 + 1].Time
		if time > length then
			length = time
		end
	end
	sequence:Destroy()
	local _length = length
	cache[assetId] = _length
	return length
end
return {
	getAnimationLength = getAnimationLength,
}
