-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Collision = _components.Collision
local CombatStats = _components.CombatStats
local DamageArea = _components.DamageArea
local Effect = _components.Effect
local ImpactEffect = _components.ImpactEffect
local Renderable = _components.Renderable
local Shape = _components.Shape
local Target = _components.Target
local Transform = _components.Transform
local WantsMelee = _components.WantsMelee
local function melee_hits(world)
	for id, _binding, combat_stats in world:query(Renderable, CombatStats, WantsMelee, Target) do
		local model = _binding.model
		local root = model:FindFirstChild("HumanoidRootPart")
		if not root then
			continue
		end
		local direction = root.CFrame.LookVector.Z + 2
		local _fn = world
		local _exp = DamageArea({
			shape = Shape.Box,
		})
		local _exp_1 = Collision({
			size = Vector3.new(5, 5, 0),
			blacklist = { model },
		})
		local _object = {}
		local _left = "cf"
		local _exp_2 = model:GetPivot()
		local _vector3 = Vector3.new(0, 0, direction)
		_object[_left] = _exp_2 + _vector3
		_fn:spawn(_exp, _exp_1, Transform(_object), ImpactEffect({
			effects = { Effect({
				creator = Option:some(id),
				effect_type = 0,
				effect_payload = {
					damage = combat_stats.damage,
				},
				target = Option:none(),
				pos = Option:none(),
			}) },
		}))
	end
end
return {
	melee_hits = melee_hits,
}
