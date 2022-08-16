-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _fusion = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "fusion", "src")
local Children = _fusion.Children
local New = _fusion.New
local Workspace = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Workspace
local camera = Workspace.CurrentCamera
local function updateLine(line, from, to, colour, visible, transparency)
	if visible then
		line.BackgroundColor3 = colour
		line.AnchorPoint = Vector2.new(0.5, 0.5)
		line.Position = UDim2.fromOffset((from.X + to.X) / 2, (from.Y + to.Y) / 2)
		line.Size = UDim2.fromOffset(((to.X - from.X) ^ 2 + (to.Y - from.Y) ^ 2) ^ 0.5, 3)
		line.Rotation = math.atan2(to.Y - from.Y, to.X - from.X) * (180 / math.pi)
		line.Transparency = transparency
	end
	line.Visible = visible
end
local function drawLine(props)
	return New("Frame")(props)
end
local function updateLineBox(target, cf, size, colour, transparency)
	local _fn = camera
	local _cf = cf
	local _cFrame = CFrame.new(size.X, size.Y, 0)
	local topLeftPos, topLeftVisible = _fn:WorldToViewportPoint((_cf * _cFrame).Position)
	local _fn_1 = camera
	local _cf_1 = cf
	local _cFrame_1 = CFrame.new(-size.X, size.Y, 0)
	local topRightPos, topRightVisible = _fn_1:WorldToViewportPoint((_cf_1 * _cFrame_1).Position)
	local _fn_2 = camera
	local _cf_2 = cf
	local _cFrame_2 = CFrame.new(size.X, -size.Y, 0)
	local bottomLeftPos, bottomLeftVisible = _fn_2:WorldToViewportPoint((_cf_2 * _cFrame_2).Position)
	local _fn_3 = camera
	local _cf_3 = cf
	local _cFrame_3 = CFrame.new(-size.X, -size.Y, 0)
	local bottomRightPos, bottomRightVisible = _fn_3:WorldToViewportPoint((_cf_3 * _cFrame_3).Position)
	updateLine(target.topLeft, Vector2.new(topLeftPos.X, topLeftPos.Y), Vector2.new(topRightPos.X, topRightPos.Y), colour, topLeftVisible, transparency)
	updateLine(target.topRight, Vector2.new(topRightPos.X, topRightPos.Y), Vector2.new(bottomRightPos.X, bottomRightPos.Y), colour, topRightVisible, transparency)
	updateLine(target.bottomLeft, Vector2.new(bottomLeftPos.X, bottomLeftPos.Y), Vector2.new(topLeftPos.X, topLeftPos.Y), colour, bottomLeftVisible, transparency)
	updateLine(target.bottomRight, Vector2.new(bottomRightPos.X, bottomRightPos.Y), Vector2.new(bottomLeftPos.X, bottomLeftPos.Y), colour, bottomRightVisible, transparency)
end
local function createLineBox()
	return New("ScreenGui")({
		Enabled = true,
		IgnoreGuiInset = true,
		[Children] = {
			topLeft = drawLine({
				Name = "topLeft",
			}),
			topRight = drawLine({
				Name = "topRight",
			}),
			bottomLeft = drawLine({
				Name = "bottomLeft",
			}),
			bottomRight = drawLine({
				Name = "bottomRight",
			}),
		},
	})
end
return {
	updateLineBox = updateLineBox,
	createLineBox = createLineBox,
}
