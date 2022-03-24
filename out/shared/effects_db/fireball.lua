-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _fusion = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src)
local Children = _fusion.Children
local New = _fusion.New
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Projectile = _components.Projectile
local Transform = _components.Transform
local Renderable = _components.Renderable
local Collision = _components.Collision
local ImpactEffect = _components.ImpactEffect
local Lifetime = _components.Lifetime
local Velocity = _components.Velocity
local Effect = _components.Effect
local function fireball(world, creator, cf, goal)
	local part = New("Part")({
		Color = Color3.fromRGB(252, 115, 36),
		Shape = Enum.PartType.Ball,
		Size = Vector3.one * 5,
	})
	local model = New("Model")({
		[Children] = { part },
		PrimaryPart = part,
		Parent = Workspace,
	})
	model:PivotTo(cf)
	return world:spawn(ImpactEffect({
		effects = { Effect({
			creator = creator,
			effect_type = 0,
			effect_payload = {
				damage = 50,
			},
			target = Option:none(),
			pos = Option:none(),
		}), Effect({
			creator = creator,
			effect_type = 1,
			effect_payload = {
				size = NumberSequence.new(48, 52),
			},
			target = Option:none(),
			pos = Option:none(),
		}) },
	}), Velocity({
		speed = 100,
	}), Renderable({
		model = model,
	}), Transform({
		cf = cf,
	}), Projectile({
		goal = goal,
	}), Lifetime({
		remaining_time = 5,
	}), Collision({
		blacklist = { model },
		size = (select(2, model:GetBoundingBox())),
	}))
end
return {
	fireball = fireball,
}
