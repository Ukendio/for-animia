-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib")
local useDeltaTime = _matter.useDeltaTime
local useThrottle = _matter.useThrottle
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Mob = _components.Mob
local Renderable = _components.Renderable
local Transform = _components.Transform
local RNG = Random.new()
local function mobsMove(world)
	for id, transform, mob in world:query(Transform, Mob, Renderable) do
		if useThrottle(RNG:NextInteger(4, 5), id) then
			local _cf = transform.cf
			local _vector3 = Vector3.new(math.random(-16, 16), 0, math.random(-16, 16))
			local targetPosition = (_cf + _vector3).Position
			world:insert(id, mob:patch({
				targetPosition = targetPosition,
			}))
		end
	end
	for id, mob, transform in world:query(Mob, Transform, Renderable) do
		local targetPosition = mob.targetPosition
		if transform and targetPosition then
			local _cFrame = CFrame.new(transform.cf.Position, targetPosition)
			local _cFrame_1 = CFrame.new(Vector3.new(0, 0, -16 * useDeltaTime()))
			local cf = _cFrame * _cFrame_1
			local _position = cf.Position
			if (targetPosition - _position).Magnitude < 0.5 then
				continue
			end
			world:insert(id, transform:patch({
				cf = cf,
				doNotReconcile = false,
			}))
		end
	end
end
return mobsMove
