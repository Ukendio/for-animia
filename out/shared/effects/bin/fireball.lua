-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _fusion = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src)
local Children = _fusion.Children
local New = _fusion.New
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Projectile = _components.Projectile
local Transform = _components.Transform
local Renderable = _components.Renderable
local Collision = _components.Collision
local ImpactEffect = _components.ImpactEffect
local Lifetime = _components.Lifetime
local Velocity = _components.Velocity
local Effect = _components.Effect
local Shape = _components.Shape
local host_effect = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "host_effect")
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects").EffectVariant
local function fireball(world, creator, cf, goal)
	local part = New("Part")({
		Color = Color3.fromRGB(252, 115, 36),
		Shape = Enum.PartType.Ball,
		Size = Vector3.one * 5,
		CanCollide = false,
		CanTouch = true,
	})
	local model = New("Model")({
		[Children] = { part },
		PrimaryPart = part,
		Parent = host_effect,
	})
	model:PivotTo(cf)
	return world:spawn(ImpactEffect({
		effects = { Effect({
			creator = creator,
			variant = EffectVariant.Explosion(NumberSequence.new(48, 52)),
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
		blacklist = { model, creator:match(function(plr)
			return plr.Character
		end, function()
			return nil
		end) },
		size = (select(2, model:GetBoundingBox())),
		shape = Shape.Sphere,
	}))
end
return {
	fireball = fireball,
}
