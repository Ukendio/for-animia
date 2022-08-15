-- Compiled with roblox-ts v1.3.3-dev-230088d
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
local Renderable = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Renderable
local function start(containers, state)
	local world = World.new()
	local myDebugger = Debugger.new(Plasma)
	myDebugger.findInstanceFromEntity = function(id)
		if not world:contains(id) then
			return nil
		end
		local model = world:get(id, Renderable)
		return if model then model.model else nil
	end
	myDebugger.authorize = function(player)
		return player.UserId == 97718174
	end
	local loop = Loop.new(world, state, myDebugger:getWidgets())
	local hotReloader = HotReloader.new()
	local firstRunSystems = {}
	local systemsByModule = {}
	local function loadModule(mod, ctx)
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
		systemsByModule[originalModule] = system
	end
	local function unloadModule(_, ctx)
		if ctx.isReloading then
			return nil
		end
		local originalModule = ctx.originalModule
		if systemsByModule[originalModule] ~= nil then
			loop:evictSystem(systemsByModule[originalModule])
			systemsByModule[originalModule] = nil
		end
	end
	local _containers = containers
	local _arg0 = function(container)
		return hotReloader:scan(container, loadModule, unloadModule)
	end
	for _k, _v in _containers do
		_arg0(_v, _k - 1, _containers)
	end
	loop:scheduleSystems(firstRunSystems)
	firstRunSystems = nil
	myDebugger:autoInitialize(loop)
	loop:begin({
		default = if RunService:IsClient() then RunService.RenderStepped else RunService.Heartbeat,
		fixed = RunService.Heartbeat,
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
	return world, state
end
return {
	start = start,
}
