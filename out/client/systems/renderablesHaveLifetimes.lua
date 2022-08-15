-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Lifetime = _components.Lifetime
local Renderable = _components.Renderable
local function renderablesHaveLifetimes(world)
	for id, _binding in world:query(Lifetime, Renderable) do
		local spawnedAt = _binding.spawnedAt
		local length = _binding.length
		if os.clock() - spawnedAt >= length then
			world:despawn(id)
		end
	end
end
return {
	event = "fixed",
	system = renderablesHaveLifetimes,
}
