-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useDeltaTime = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useDeltaTime
local RunService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").RunService
local Lifetime = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Lifetime
local function lifetimesDie(world)
	for id, lifetime in world:query(Lifetime) do
		lifetime = lifetime:patch({
			elapsed = lifetime.elapsed + useDeltaTime(),
		})
		if os.clock() > lifetime.spawnedAt + lifetime.length then
			world:despawn(id)
		else
			world:insert(id, lifetime)
		end
	end
end
return {
	event = if RunService:IsClient() then "fixed" else "default",
	system = lifetimesDie,
}
