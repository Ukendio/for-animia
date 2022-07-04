-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Plasma = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "plasma", "src")
return Plasma.widget(function(opt)
	local highlightInstance = Plasma.useInstance(function()
		return Plasma.create("Highlight", {
			FillTransparency = 1,
			FillColor = Color3.fromRGB(255, 255, 255),
			OutlineTransparency = opt.OutlineTransparency,
		})
	end)
	return highlightInstance
end)
