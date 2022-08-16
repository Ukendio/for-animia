-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local start = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "start").start
local emitEffects = TS.import(script, game:GetService("ServerScriptService"), "Game", "emitEffects").emitEffects
local setupTags = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "setupTags").setupTags
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Client = _components.Client
local CombatStats = _components.CombatStats
local Renderable = _components.Renderable
local Zone = _components.Zone
local promiseR15 = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "promise-character").default
local trackLineSight = TS.import(script, game:GetService("ServerScriptService"), "Game", "trackLineSight")
local setPartCollisionGroup = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "setCharacterCollisionGroup").setPartCollisionGroup
local setupPhysicsCollisionRemove = TS.import(script, game:GetService("ServerScriptService"), "Game", "physicsGroupCollide").setupPhysicsCollisionRemove
local testBootStrapper = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "testBoostrapper").testBootStrapper
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
				model = model,
			}), Client({
				player = player,
				lineSight = Vector3.zero,
				document = {
					rewardsMultiplier = 1,
				},
			}), CombatStats({
				hp = 100,
				maxHp = 100,
				damage = 10,
			}))
			character:SetAttribute("entityId", playerId)
			setPartCollisionGroup(character, "Agency")
		end)
	end
	if player.Character then
		characterAdded(player.Character)
	end
	player.CharacterAdded:Connect(characterAdded)
end
Players.PlayerAdded:Connect(playerAdded)
for _, player in Players:GetPlayers() do
	playerAdded(player)
end
setupPhysicsCollisionRemove()
testBootStrapper(script.tests:GetChildren())
