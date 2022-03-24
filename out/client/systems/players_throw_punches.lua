-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib)
local useEvent = _matter.useEvent
local useThrottle = _matter.useThrottle
local UserInputService = TS.import(script, TS.getModule(script, "@rbxts", "services")).UserInputService
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Target = _components.Target
local Renderable = _components.Renderable
local CombatStats = _components.CombatStats
local WantsMelee = _components.WantsMelee
local use_anim = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "use_anim").use_anim
-- animation id 9006471997
local animation = Instance.new("Animation")
animation.AnimationId = "rbxassetid://9006471997"
local function players_throw_punches(world, state)
	if useThrottle(3) then
		for id, renderable, combat_stats in world:query(Renderable, CombatStats, Target) do
			for _, _binding in useEvent(UserInputService, "InputBegan") do
				local UserInputType = _binding.UserInputType
				if UserInputType == state.m1 then
					local model = renderable.model
					local _animator = model:FindFirstChildOfClass("Humanoid")
					if _animator ~= nil then
						_animator = _animator:FindFirstChildOfClass("Animator")
					end
					local animator = _animator
					if not animator then
						continue
					end
					if renderable.in_anim == nil then
						renderable:patch({
							in_anim = false,
						})
					end
					use_anim(animator, animation, not renderable.in_anim)
					world:insert(id, WantsMelee())
				end
			end
		end
	end
end
return {
	players_throw_punches = players_throw_punches,
}
