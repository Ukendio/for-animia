-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Vec = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Vec
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Renderable = _components.Renderable
local Target = _components.Target
local Mob = _components.Mob
local WantsMelee = _components.WantsMelee
local function mobs_move(world)
	local targets = Vec:vec()
	for _, _binding in world:query(Renderable, Target) do
		local model = _binding.model
		targets:push(model:GetPivot().Position)
	end
	for id, _, render in world:query(Mob, Renderable) do
		local closest_position = nil
		local closest_distance = nil
		local model = render.model
		local current_position = model:GetPivot().Position
		targets:iter():forEach(function(target)
			local distance = (current_position - target).Magnitude
			if not closest_position or distance < closest_distance then
				closest_position = target
				closest_distance = distance
			end
		end)
		if closest_position then
			model.Humanoid:MoveTo(closest_position)
			if (closest_position - current_position).Magnitude < 4 then
				local a = world:get(id, WantsMelee)
				if world:get(id, WantsMelee) then
					break
				end
				world:insert(id, WantsMelee())
			end
		end
	end
end
return {
	mobs_move = mobs_move,
}
