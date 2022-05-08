-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local ice_hit = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "bin", "ice_hit").ice_hit
return function(target)
	local effects_model = ice_hit(Vector3.new(0, 10, 0))
	return function()
		effects_model:Destroy()
	end
end
