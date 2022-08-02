-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Agency = _components.Agency
local Mob = _components.Mob
local Renderable = _components.Renderable
local function mobsMove(world)
	local targets = {}
	for id, _binding in world:query(Renderable, Agency) do
		local model = _binding.model
		local _position = model:GetPivot().Position
		table.insert(targets, _position)
	end
	for id, mob in world:query(Mob, Renderable) do
		local closestPosition, closestDistance = nil, nil
	end
end
return mobsMove
