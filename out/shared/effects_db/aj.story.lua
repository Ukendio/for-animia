-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Plasma = TS.import(script, TS.getModule(script, "@rbxts", "plasma").out)
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
return function(target)
	local root = Plasma.new(target)
	Plasma.start(root, function()
		Plasma.portal(Workspace, function()
			Plasma.arrow(Vector3.zero, Vector3.new(10, 0, 0))
			Plasma.arrow(Vector3.zero, Vector3.new(0, 10, 0))
			Plasma.arrow(Vector3.zero, Vector3.new(0, 0, 10))
		end)
	end)
	return function()
		Plasma.start(root, function() end)
	end
end
