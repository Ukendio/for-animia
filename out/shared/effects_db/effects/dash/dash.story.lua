-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib)
local Loop = _matter.Loop
local useDeltaTime = _matter.useDeltaTime
local World = _matter.World
local Plasma = TS.import(script, TS.getModule(script, "@rbxts", "plasma").out)
local Vec = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Vec
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local ReplicatedStorage = _services.ReplicatedStorage
local RunService = _services.RunService
local Workspace = _services.Workspace
local Renderable = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").Renderable
return function(target)
	local root = Plasma.new(target)
	local world = World.new()
	local loop = Loop.new(world)
	loop:scheduleSystems({ function() end })
	local connections = loop:begin({
		default = RunService.Heartbeat,
	})
	local origin = CFrame.new(Vector3.new(0, 10, 0))
	local target_cf = origin
	local cf = origin
	local dummy = ReplicatedStorage.Assets.Dummy:Clone()
	dummy:PivotTo(cf)
	dummy.Parent = Workspace
	local id = world:spawn(Renderable({
		model = dummy,
	}))
	local elapsed = 0
	local should_reconcile = false
	local stack_automata = Vec:vec()
	RunService.Heartbeat:Connect(function()
		Plasma.start(root, function()
			Plasma.portal(Workspace, function()
				return Plasma.arrow(origin.Position, cf.Position)
			end)
			Plasma.window("Click to Dash", function()
				if Plasma.button("Click!"):clicked() then
					if should_reconcile then
						return nil
					end
					stack_automata:push(function()
						local direction = dummy:GetPivot().LookVector * 15
						target_cf = target_cf + direction
						should_reconcile = true
					end)
				end
			end)
			stack_automata:pop():map(function(fn)
				return fn()
			end)
			if should_reconcile then
				stack_automata:push(function()
					elapsed += useDeltaTime()
					cf = dummy:GetPivot():Lerp(target_cf, elapsed)
				end)
			end
			if cf == target_cf then
				stack_automata:push(function()
					target_cf = origin
					elapsed = 0
					cf = origin
					should_reconcile = false
				end)
			end
			dummy:PivotTo(cf)
		end)
	end)
	return function()
		dummy:Destroy()
		world:clear()
		connections.default:Disconnect()
		Plasma.start(root, function() end)
	end
end
