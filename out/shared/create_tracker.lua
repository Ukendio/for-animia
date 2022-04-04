-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Lifetime = _components.Lifetime
local Projectile = _components.Projectile
local Renderable = _components.Renderable
local Rotation = _components.Rotation
local Tracker = _components.Tracker
local Transform = _components.Transform
local function create_tracker(world, origin, cf, name, caster_model, angle)
	local p = Instance.new("Part")
	p.Size = Vector3.one
	p.Transparency = 1
	p.Anchored = true
	p.CanCollide = false
	p.CanTouch = false
	p.CastShadow = false
	p.BrickColor = BrickColor.Red()
	local model = Instance.new("Model")
	model.Name = name
	model.PrimaryPart = p
	model.Parent = Workspace.Effects
	p.Parent = model
	return world:spawn(Renderable({
		model = model,
	}), Transform({
		cf = cf,
	}), Projectile({
		goal = cf.Position,
	}), Lifetime({
		remaining_time = 1,
	}), Tracker(), Rotation({
		angle = angle,
	}))
end
return {
	create_tracker = create_tracker,
}
