-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Renderable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").Renderable
local function dash(world, id, pos)
	local renderable = world:get(id, Renderable)
	if renderable then
		world:insert(id)
	end
end
return {
	dash = dash,
}
