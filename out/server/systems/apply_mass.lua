-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Mass = _components.Mass
local Renderable = _components.Renderable
local Target = _components.Target
local function apply_mass(world)
	for _, mass_record, _binding in world:queryChanged(Mass, Renderable, Target) do
		local model = _binding.model
		if mass_record.new then
			for _1, v in ipairs(model:GetDescendants()) do
				if v:IsA("BasePart") then
					local _binding_1 = mass_record.new
					local density = _binding_1.density
					local friction = _binding_1.friction
					local elasticity = _binding_1.elasticity
					v.CustomPhysicalProperties = PhysicalProperties.new(density, friction, elasticity)
				end
			end
		end
	end
end
return {
	apply_mass = apply_mass,
}
