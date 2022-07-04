-- Compiled with roblox-ts v1.3.3-dev-5633519
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local match = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").match
local dash = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "bin", "dash").dash
local function replicate_fx_on_client(world, _param)
	local source = _param.source
	local variant = _param.variant
	local target = _param.target
	local pos = _param.pos
	match(variant, {
		Dash = function(_param_1)
			local direction = _param_1.direction
			return dash(direction, source)
		end,
		Damage = error,
	})
end
return {
	replicate_fx_on_client = replicate_fx_on_client,
}
