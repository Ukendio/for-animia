-- Compiled with roblox-ts v1.3.3-dev-5633519
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib")
local Debugger = _matter.Debugger
local Loop = _matter.Loop
local World = _matter.World
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local RunService = _services.RunService
local UserInputService = _services.UserInputService
local HotReloader = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "rewire", "out").HotReloader
local Plasma = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "plasma", "src")
-- import { ChickynoidClient, ChickynoidServer } from "./chickynoid/types";
local function start(container, state)
	local world = World.new()
	local myDebugger = Debugger.new(Plasma)
	myDebugger.authorize = function(player)
		local condition = player.UserId == 97718174
		if not condition then
			player:Kick("Nice try kid 😂")
		end
		return condition
	end
	local loop = Loop.new(world, state, myDebugger:getWidgets())
	local hotReloader = HotReloader.new()
	local firstRunSystems = {}
	local systemsByModule = {}
	hotReloader:scan(container, function(mod, ctx)
		local originalModule = ctx.originalModule
		local ok, system = pcall(require, mod)
		if not ok then
			warn("Error when hot-reloading system", mod.Name, system)
			return nil
		end
		if firstRunSystems then
			table.insert(firstRunSystems, system)
		elseif systemsByModule[originalModule] ~= nil then
			loop:replaceSystem(systemsByModule[originalModule], system)
			myDebugger:replaceSystem(systemsByModule[originalModule], system)
		else
			loop:scheduleSystem(system)
		end
	end, function(_, ctx)
		if ctx.isReloading then
			return nil
		end
		local originalModule = ctx.originalModule
		if systemsByModule[originalModule] ~= nil then
			loop:evictSystem(systemsByModule[originalModule])
			systemsByModule[originalModule] = nil
		end
	end)
	loop:scheduleSystems(firstRunSystems)
	firstRunSystems = nil
	myDebugger:autoInitialize(loop)
	loop:begin({
		default = RunService.Heartbeat,
	})
	-- let chickynoid: typeof ChickynoidClient | typeof ChickynoidServer = ChickynoidClient;
	if RunService:IsClient() then
		UserInputService.InputBegan:Connect(function(input)
			if input.KeyCode == Enum.KeyCode.F4 then
				myDebugger:toggle()
				state.debugEnabled = myDebugger.enabled
			end
		end)
	end
	-- (chickynoid as typeof ChickynoidClient & typeof ChickynoidServer).Setup();
	return world
end
return {
	start = start,
}
