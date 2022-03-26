-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useEvent
local UserInputService = TS.import(script, TS.getModule(script, "@rbxts", "services")).UserInputService
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Collision = _components.Collision
local CombatStats = _components.CombatStats
local DamageArea = _components.DamageArea
local Effect = _components.Effect
local ImpactEffect = _components.ImpactEffect
local Mastery = _components.Mastery
local Renderable = _components.Renderable
local Shape = _components.Shape
local Soul = _components.Soul
local Target = _components.Target
local Transform = _components.Transform
local souls_db = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "souls_db").souls_db
local use_anim = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "use_anim").use_anim
-- animation id 9006471997
local animation = Instance.new("Animation")
animation.AnimationId = "rbxassetid://9006471997"
local function detriot_smash(world, controls)
	for id, renderable, combat_stats, mastery, soul in world:query(Renderable, CombatStats, Mastery, Soul, Target) do
		if soul.name == "Deku" then
			for _, _binding in useEvent(UserInputService, "InputBegan") do
				local KeyCode = _binding.KeyCode
				if KeyCode == controls.use_ability_1 then
					local model = renderable.model
					local root = model:FindFirstChild("HumanoidRootPart")
					local _animator = model:FindFirstChildOfClass("Humanoid")
					if _animator ~= nil then
						_animator = _animator:FindFirstChildOfClass("Animator")
					end
					local animator = _animator
					if not root or not animator then
						continue
					end
					if renderable.in_anim == nil then
						renderable = renderable:patch({
							in_anim = false,
						})
					end
					local anim_track = use_anim(animator, animation, not renderable.in_anim)
					for _element in useEvent(anim_track, "Stopped") do
						local _ = { _element }
					end
					local direction = root.CFrame.LookVector.Z + 2
					local deku_detroit_smash_info = souls_db.Deku.abilities["Detroit Smash"]
					local damage = deku_detroit_smash_info.base_damage:i(mastery.lvl)
					local _exp = model:GetPivot()
					local _vector3 = Vector3.new(0, 0, direction)
					local cf = _exp + _vector3
					world:spawn(DamageArea({
						shape = Shape.Box,
					}), Transform({
						cf = cf,
					}), Collision({
						size = Vector3.new(5, 5, 0),
						blacklist = { model },
					}), ImpactEffect({
						effects = { Effect({
							effect_type = 0,
							effect_payload = {
								damage = 50,
							},
						}) },
					}))
				end
			end
		end
	end
end
return {
	detriot_smash = detriot_smash,
}
