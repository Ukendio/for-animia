-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Agency = _components.Agency
local Mass = _components.Mass
local Renderable = _components.Renderable
local function apply_mass(world)
	for id, mass_record in world:queryChanged(Mass) do
		local renderable, mass = world:get(id, Renderable, Agency)
		if renderable == nil or mass == nil then
			continue
		end
		if mass_record.new then
			for _, v in ipairs(renderable.model:GetDescendants()) do
				if v:IsA("BasePart") then
					local _binding = mass_record.new
					local density = _binding.density
					local friction = _binding.friction
					local elasticity = _binding.elasticity
					v.CustomPhysicalProperties = PhysicalProperties.new(density, friction, elasticity)
				end
			end
		end
	end
end
return {
	apply_mass = apply_mass,
}
