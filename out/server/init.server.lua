<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local start = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "start").start
local emitEffects = TS.import(script, game:GetService("ServerScriptService"), "Game", "emitEffects").emitEffects
local setupTags = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "setupTags").setupTags
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Agency = _components.Agency
<<<<<<< HEAD
local CombatStats = _components.CombatStats
local Renderable = _components.Renderable
local Zone = _components.Zone
local promiseR15 = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "promise-character").default
local trackLineSight = TS.import(script, game:GetService("ServerScriptService"), "Game", "trackLineSight")
local setPartCollisionGroup = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "setCharacterCollisionGroup").setPartCollisionGroup
local setupPhysicsCollisionRemove = TS.import(script, game:GetService("ServerScriptService"), "Game", "physicsGroupCollide").setupPhysicsCollisionRemove
local state = {}
local world = start({ script.systems, ReplicatedStorage.Shared.systems }, state)(emitEffects, setupTags, trackLineSight)
world:spawn(Zone({
	maxCapacity = 5,
	population = 0,
}))
local function playerAdded(player)
	local function characterAdded(character)
		promiseR15(character):andThen(function(model)
			local playerId = world:spawn(Renderable({
=======
local Renderable = _components.Renderable
local promiseR15 = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "promise-character").default
local trackLineSight = TS.import(script, game:GetService("ServerScriptService"), "Game", "trackLineSight")
local world = start({ script.systems, ReplicatedStorage.Shared.systems }, {})
emitEffects(world)
setupTags(world)
trackLineSight(world)
local function playerAdded(player)
	local function characterAdded(character)
		promiseR15(character):andThen(function(model)
			world:spawn(Renderable({
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
				model = model,
			}), Agency({
				player = player,
				lineSight = Vector3.zero,
<<<<<<< HEAD
			}), CombatStats({
				hp = 100,
				maxHp = 100,
				damage = 10,
			}))
			character:SetAttribute("entityId", playerId)
			setPartCollisionGroup(character, "Agency")
=======
			}))
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		end)
	end
	if player.Character then
		characterAdded(player.Character)
	end
	player.CharacterAdded:Connect(characterAdded)
end
Players.PlayerAdded:Connect(playerAdded)
for _, player in Players:GetPlayers() do
<<<<<<< HEAD
	playerAdded(player)
end
setupPhysicsCollisionRemove()
=======
	if player == Players.LocalPlayer then
		continue
	end
	playerAdded(player)
end
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
