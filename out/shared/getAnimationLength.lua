-- Compiled with roblox-ts v2.0.4
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
