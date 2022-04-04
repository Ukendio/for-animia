-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Mass = _components.Mass
local Renderable = _components.Renderable
local Target = _components.Target
local function frictionless_grapplers(world)
	for id in world:query(Renderable, Target):without(Mass) do
		local density = 0.3
		local friction = 0
		local elasticity = 0
		world:insert(id, Mass({
			density = density,
			friction = friction,
			elasticity = elasticity,
		}))
	end
end
return {
	frictionless_grapplers = frictionless_grapplers,
}
