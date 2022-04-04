-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useHookState = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useHookState
local function cleanup(storage)
	if storage.animation_track then
		storage.animation_track:Stop()
		storage.animation_track:Destroy()
		storage.animation:Destroy()
	end
end
local function use_anim(animator, animation, pause)
	if pause == nil then
		pause = false
	end
	local storage = useHookState(animator, cleanup)
	if storage.animation ~= animation then
		storage.animation = animation
		if storage.animation_track then
			storage.animation_track:Play()
			storage.played = true
			storage.animation_track:Destroy()
		end
	end
	if storage.animation_track == nil then
		storage.animation_track = animator:LoadAnimation(animation)
	end
	local looped = storage.animation_track.Looped
	local _condition = not storage.animation_track.IsPlaying
	if _condition then
		local _condition_1 = looped
		if _condition_1 == nil then
			_condition_1 = (not looped and not storage.played)
		end
		_condition = _condition_1
	end
	if _condition then
		storage.played = true
		storage.animation_track:Play()
	end
	storage.animation_track:AdjustSpeed(if pause then 0 else 1)
	return storage.animation_track
end
return {
	cleanup = cleanup,
	use_anim = use_anim,
}
