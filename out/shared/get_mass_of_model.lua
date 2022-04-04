-- Compiled with roblox-ts v1.3.3
local function get_mass_of_model(model)
	local mass = 0
	local _exp = model:GetChildren()
	local _arg0 = function(v)
		if v:IsA("BasePart") then
			if v.Massless == false then
				mass += v:GetMass()
			end
		end
	end
	for _k, _v in ipairs(_exp) do
		_arg0(_v, _k - 1, _exp)
	end
	return mass / 1.75
end
return {
	get_mass_of_model = get_mass_of_model,
}
