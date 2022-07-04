-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _fusion = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "fusion", "src")
local Children = _fusion.Children
local New = _fusion.New
local billboardGui = New("BillboardGui")({
	AlwaysOnTop = true,
	Enabled = true,
	Size = UDim2.new(0, 50, 20, 0),
	[Children] = { New("TextLabel")({
		Size = UDim2.fromScale(1, 1),
		BackgroundTransparency = 1,
		BorderColor3 = Color3.fromRGB(27, 42, 53),
		BorderSizePixel = 1,
		TextStrokeTransparency = 1,
		TextColor3 = Color3.fromRGB(255, 255, 255),
		TextSize = 15,
		TextXAlignment = Enum.TextXAlignment.Left,
		TextYAlignment = Enum.TextYAlignment.Top,
	}) },
})
return function()
	return billboardGui:Clone()
end
