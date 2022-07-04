-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").Effect
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "remotes")
local remoteEvent = remotes.Server:Get("CreateFx")
local function emitEffects(world)
	remoteEvent:Connect(function(_, effect)
		world:spawn(Effect(effect))
	end)
end
return {
	emitEffects = emitEffects,
}
