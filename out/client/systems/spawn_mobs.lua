-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, TS.getModule(script, "@rbxts", "matter").lib).useThrottle
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local ReplicatedStorage = TS.import(script, TS.getModule(script, "@rbxts", "services")).ReplicatedStorage
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Mastery = _components.Mastery
local Mob = _components.Mob
local Renderable = _components.Renderable
local Soul = _components.Soul
local Transform = _components.Transform
local assets = ReplicatedStorage.Assets
local function find_soul_model(name)
	return Option:wrap(assets:FindFirstChild(name)):unwrapOr(assets.Dummy:Clone())
end
local function spawn_mobs(world)
	if useThrottle(5) then
		local _vector3 = Vector3.new(100, 3, 100)
		local _vector3_1 = Vector3.new(if math.random(1, 2) == 1 then 1 else -1, 1, if math.random(1, 2) == 1 then 1 else -1)
		local spawn_pos = _vector3 * _vector3_1
		world:spawn(Soul({
			name = "Deku",
		}), Mastery({
			lvl = 3,
			exp = 100000,
		}), Transform({
			cf = CFrame.new(spawn_pos),
		}), Mob())
	end
	for id, soul in world:query(Soul, Mob, Transform):without(Renderable) do
		local model = find_soul_model(soul.name)
		world:insert(id, Renderable({
			model = model,
		}))
	end
end
return {
	spawn_mobs = spawn_mobs,
}
