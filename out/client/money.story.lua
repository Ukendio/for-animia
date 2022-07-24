-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local StarterGui = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").StarterGui
local Money = TS.import(script, game:GetService("ReplicatedStorage"), "Client", "money").default
return function(target)
	local handle = Roact.mount(Roact.createElement(Money), target)
	local studioHandle = Roact.mount(Roact.createElement("ScreenGui", {}, {
		Roact.createElement(Money),
	}), StarterGui)
	return function()
		Roact.unmount(handle)
		Roact.unmount(studioHandle)
	end
end
