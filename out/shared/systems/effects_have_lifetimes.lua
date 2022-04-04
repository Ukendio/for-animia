-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useDeltaTime = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useDeltaTime
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Lifetime = _components.Lifetime
local Renderable = _components.Renderable
local function effects_have_lifetimes(world)
	for id, lifetime in world:query(Lifetime, Renderable) do
		local _fn = world
		local _exp = id
		lifetime = lifetime:patch({
			remaining_time = lifetime.remaining_time - useDeltaTime(),
		})
		_fn:insert(_exp, lifetime)
		if lifetime.remaining_time <= 0 then
			world:despawn(id)
		end
	end
end
return {
	effects_have_lifetimes = effects_have_lifetimes,
}
