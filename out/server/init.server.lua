-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local start = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "start").start
local emitEffects = TS.import(script, game:GetService("ServerScriptService"), "Game", "emitEffects").emitEffects
local setupTags = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "setupTags").setupTags
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Workspace = _services.Workspace
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Charge = _components.Charge
local Renderable = _components.Renderable
local Target = _components.Target
local promiseR15 = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "promise-character").default
local world = start({ script.systems, ReplicatedStorage.Shared.systems }, {})
emitEffects(world)
setupTags(world)
world:spawn(Renderable({
	model = Workspace:FindFirstChild("Lambo"),
}), Charge({
	charge = 100,
}))
local function characterAdded(character)
	promiseR15(character):andThen(function(model)
		world:spawn(Renderable({
			model = model,
		}), Target())
	end)
end
local function playerAdded(player)
	if player.Character then
		characterAdded(player.Character)
	end
	player.CharacterAdded:Connect(characterAdded)
end
Players.PlayerAdded:Connect(playerAdded)
for _, player in Players:GetPlayers() do
	if player == Players.LocalPlayer then
		continue
	end
	playerAdded(player)
end
