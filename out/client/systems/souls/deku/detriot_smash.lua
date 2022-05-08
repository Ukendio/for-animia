-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useEvent
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local UserInputService = _services.UserInputService
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Collision = _components.Collision
local CombatStats = _components.CombatStats
local Effect = _components.Effect
local ImpactEffect = _components.ImpactEffect
local Mastery = _components.Mastery
local Renderable = _components.Renderable
local Shape = _components.Shape
local Soul = _components.Soul
local Target = _components.Target
local Transform = _components.Transform
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects").EffectVariant
local souls_db = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "souls_db").souls_db
local use_anim = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "hooks", "use_anim").use_anim
-- animation id 9006471997
local plr = Players.LocalPlayer
local animation = Instance.new("Animation")
animation.AnimationId = "rbxassetid://9006471997"
-- Yeah, the rule would probably be any time you're going to make a "singleton component" where the component is only ever on one entity in the entire world... Putting that state in the state table solves the same problem in a much simpler way.
local function detriot_smash(world, controls, agency)
	for _, renderable, combat_stats, mastery, soul in world:query(Renderable, CombatStats, Mastery, Soul, Target) do
		if soul.name == "Deku" then
			for _1, _binding in useEvent(UserInputService, "InputBegan") do
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
					use_anim(animator, animation, not renderable.in_anim)
					local direction = root.CFrame.LookVector.Unit * 2
					local deku_detroit_smash_info = souls_db.Deku.abilities["Detroit Smash"]
					local base_damage = deku_detroit_smash_info.base_damage:i(mastery.lvl)
					local cf = model:GetPivot() + direction
					world:spawn(Transform({
						cf = cf,
					}), Collision({
						size = Vector3.new(5, 5, 0),
						blacklist = { model },
						shape = Shape.Box,
					}), ImpactEffect({
						effects = { Effect({
							creator = Option:some(plr),
							variant = EffectVariant.Damage(combat_stats.damage + base_damage),
							target = Option:none(),
							pos = Option:none(),
						}), Effect({
							creator = Option:some(plr),
							variant = EffectVariant.KnockBack(Vector3.new(0, 0, 200)),
							target = Option:none(),
							pos = Option:none(),
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
