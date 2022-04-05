-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib)
local useEvent = _matter.useEvent
local useThrottle = _matter.useThrottle
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Ability = _components.Ability
local Counter = _components.Counter
local Renderable = _components.Renderable
local Target = _components.Target
local Tracker = _components.Tracker
local Transform = _components.Transform
local create_tracker = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "create_tracker").create_tracker
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "remotes").remotes
local create_fx = remotes.Server:Get("create_fx")
local function ice_arrows(world)
	for _, plr, variant in useEvent("create_fx", create_fx) do
		for _1, _binding in world:query(Renderable, Target) do
			local model = _binding.model
			if plr == Players:GetPlayerFromCharacter(model) then
				do
					local i = 0
					local _shouldIncrement = false
					while true do
						if _shouldIncrement then
							i += 1
						else
							_shouldIncrement = true
						end
						if not (i < 3) then
							break
						end
						world:spawn(Transform({
							cf = CFrame.new(variant.pos or Vector3.zero),
							do_not_reconcile = false,
						}), Tracker({
							target = model,
						}), Counter({
							idx = i,
						}))
					end
				end
			end
		end
	end
	for id, ability, transform, tracker, counter in world:query(Ability, Transform, Tracker, Counter) do
		local fn = function()
			local ANGLES = { CFrame.new(math.random(20, 30), 0, 0), CFrame.new(math.random(-30, -20), 0, 0), CFrame.new(0, math.random(20, 30), 0) }
			local model = tracker.target
			local root_part = model:FindFirstChild("HumanoidRootPart")
			local humanoid = model:FindFirstChild("Humanoid")
			if not root_part or not humanoid then
				return nil
			end
			local start = root_part.CFrame.Position
			create_tracker(world, start, transform.cf, ability.name .. "_server", model, ANGLES[counter.idx + 1])
			world:despawn(id)
		end
		if counter.idx == 0 then
			fn()
		elseif useThrottle(0.1) then
			fn()
		end
	end
end
return {
	ice_arrows = ice_arrows,
}
