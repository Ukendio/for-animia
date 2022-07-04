-- Compiled with roblox-ts v1.3.3-dev-5633519
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Charge = _components.Charge
local CombatStats = _components.CombatStats
local Renderable = _components.Renderable
local Target = _components.Target
local start = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "start").start
local receiveReplication = TS.import(script, script, "receiveReplication").receiveReplication
local player = Players.LocalPlayer
local state = {
	debugEnabled = true,
	character = player.Character or (player.CharacterAdded:Wait()),
	lastInput = nil,
}
local world = start(script.systems, state)
receiveReplication(world)
world:spawn(Renderable({
	model = workspace.Lambo,
}), Charge({
	charge = 100,
}))
task.delay(5, function()
	return world:spawn(Renderable({
		model = state.character,
	}), CombatStats({
		hp = 100,
		maxHp = 100,
		damage = 1000,
	}), Target())
end)
