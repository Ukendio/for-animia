-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Todo = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Todo
local function melee(world)
	for id, body, transform, meleeAttack in world:query(Todo) do
	end
end
return melee
