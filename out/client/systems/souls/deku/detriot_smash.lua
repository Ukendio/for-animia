-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Collision = _components.Collision
local CombatStats = _components.CombatStats
local Effect = _components.Effect
local ImpactEffect = _components.ImpactEffect
local Mastery = _components.Mastery
local Renderable = _components.Renderable
local Shape = _components.Shape
local Soul = _components.Soul
local Transform = _components.Transform
local UseAbility = _components.UseAbility
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects").EffectVariant
local souls_db = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "souls_db").souls_db
local use_anim = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "hooks", "use_anim").use_anim
-- animation id 9006471997
local plr = Players.LocalPlayer
local animation = Instance.new("Animation")
animation.AnimationId = "rbxassetid://9006471997"
-- Yeah, the rule would probably be any time you're going to make a "singleton component" where the component is only ever on one entity in the entire world... Putting that state in the state table solves the same problem in a much simpler way.
local function detriot_smash(world, controls, agency)
	for _, renderable, combat_stats, mastery, soul, use_ability in world:query(Renderable, CombatStats, Mastery, Soul, UseAbility) do
		if soul.name ~= "Deku" or use_ability.key_code ~= controls.use_ability_1 then
			continue
		end
		local model = renderable.model
		local root = model:FindFirstChild("HumanoidRootPart")
		local _animator = model:FindFirstChildOfClass("Humanoid")
		if _animator ~= nil then
			_animator = _animator:FindFirstChildOfClass("Animator")
		end
		local animator = _animator
		local deku_detroit_smash_info = souls_db.Deku.abilities["Detroit Smash"]
		local base_damage = deku_detroit_smash_info.base_damage:i(mastery.lvl)
		local creator = Option:none()
		local direction = root.CFrame.LookVector.Unit * 2
		local cf = model:GetPivot() + direction
		if not root or not animator then
			continue
		end
		use_anim(animator, animation)
		world:spawn(Transform({
			cf = cf,
		}), Collision({
			size = Vector3.new(5, 5, 0),
			blacklist = { model },
			shape = Shape.Box,
		}), ImpactEffect({
			effects = { Effect({
				creator = creator,
				variant = EffectVariant.Damage(combat_stats.damage + base_damage),
				target = Option:none(),
				pos = Option:none(),
			}), Effect({
				creator = creator,
				variant = EffectVariant.KnockBack(Vector3.new(0, 0, 200)),
				target = Option:none(),
				pos = Option:none(),
			}) },
		}))
	end
end
return {
	detriot_smash = detriot_smash,
}
