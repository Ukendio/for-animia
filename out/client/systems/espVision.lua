<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useThrottle
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local DebugAdornment = _components.DebugAdornment
local Renderable = _components.Renderable
local Agency = _components.Agency
local Components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local cloneTemplate = TS.import(script, game:GetService("ReplicatedStorage"), "Client", "cloneTemplate")
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
<<<<<<< HEAD
local ReplicatedStorage = _services.ReplicatedStorage
=======
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local Workspace = _services.Workspace
local _linebox = TS.import(script, game:GetService("ReplicatedStorage"), "Client", "linebox")
local createLineBox = _linebox.createLineBox
local updateLineBox = _linebox.updateLineBox
<<<<<<< HEAD
local camera = Workspace.CurrentCamera
local remoteEvent = ReplicatedStorage:WaitForChild("TrackLineOfSight")
=======
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "remotes")
local camera = Workspace.CurrentCamera
local remoteEvent = remotes.Client:Get("TrackLineSight")
print(remoteEvent)
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
warn("Press ALT + F4 to toggle debug overlay")
local raycastParams = RaycastParams.new()
raycastParams.FilterType = Enum.RaycastFilterType.Blacklist
local function espVision(world, state, ui)
	local transparency = ui.slider(1)
	if not state.debugEnabled then
		for id, debugAdornment in world:query(DebugAdornment) do
			debugAdornment.label:Destroy()
			debugAdornment.highlight:Destroy()
			debugAdornment.lineBox:Destroy()
			debugAdornment.lineSight:Destroy()
			world:remove(id, DebugAdornment)
		end
		return nil
	end
	for _, debugAdornmentRecord in world:queryChanged(DebugAdornment) do
		if debugAdornmentRecord.new == nil then
			if debugAdornmentRecord.old then
				local debugAdornment = debugAdornmentRecord.old
				debugAdornment.highlight:Destroy()
				debugAdornment.label:Destroy()
				debugAdornment.lineBox:Destroy()
				debugAdornment.lineSight:Destroy()
			end
		end
	end
	for id, renderable, agency in world:query(Renderable, Agency) do
		if agency.player == Players.LocalPlayer then
			continue
		end
		local model = renderable.model
		local debugAdornment = world:get(id, DebugAdornment)
		if not debugAdornment then
			local label = cloneTemplate()
			label.Parent = model
			label.Adornee = model
			local highlight = Instance.new("Highlight")
			highlight.Parent = model
			highlight.Adornee = model
			highlight.FillTransparency = 1
			highlight.OutlineColor = Color3.fromRGB(255, 0, 0)
			local lineBox = createLineBox()
			lineBox.Parent = Players.LocalPlayer:FindFirstChild("PlayerGui")
			local lineSight = Instance.new("Part")
			lineSight.Anchored = true
			lineSight.CanCollide = false
			lineSight.CanQuery = false
			lineSight.CanTouch = false
			lineSight.Parent = Workspace.Terrain
			debugAdornment = DebugAdornment({
				label = label,
				highlight = highlight,
				lineBox = lineBox,
				lineSight = lineSight,
			})
			world:insert(id, debugAdornment)
		end
		local text = "Entity: " .. tostring(id)
		text ..= "\n"
		for name, component in pairs(Components) do
			local data = world:get(id, component)
			if data then
				text ..= name .. " {"
				if (next(data)) ~= nil then
					for key, val in pairs(data) do
						text ..= "\n  " .. (key .. (": " .. tostring(val)))
					end
					text ..= "\n"
				end
				text ..= "}\n"
			end
		end
		if debugAdornment then
			debugAdornment.label.TextLabel.Text = text
			debugAdornment.label.TextLabel.TextTransparency = transparency
			debugAdornment.highlight.OutlineTransparency = transparency
			local from, to = model.Head.Position, agency.lineSight
			debugAdornment.lineSight.CFrame = CFrame.new((from + to) / 2, to)
			debugAdornment.lineSight.Size = Vector3.new(0.1, 0.1, (to - from).Magnitude)
			debugAdornment.lineSight.Transparency = transparency
			debugAdornment.lineSight.Color = Color3.fromRGB(255, 0, 0)
			local _exp = debugAdornment.lineBox
			local _exp_1 = model:GetPivot()
			local _vector3 = Vector3.new(0, 0.5)
			updateLineBox(_exp, _exp_1 - _vector3, Vector3.new(2, 0.5 * model.HumanoidRootPart.Size.Y + model.Humanoid.HipHeight, 0), Color3.fromRGB(255, 0, 0), transparency)
		end
	end
	raycastParams.FilterDescendantsInstances = { state.character }
	local cf = state.character:GetPivot()
	local result = Workspace:Raycast(cf.Position, camera.CFrame.LookVector * 500, raycastParams)
	if useThrottle(0.03) then
		if result and result.Position then
<<<<<<< HEAD
			remoteEvent:FireServer(result.Position)
		else
			remoteEvent:FireServer(camera.CFrame.LookVector * 500)
=======
			remoteEvent:SendToServer(result.Position)
		else
			remoteEvent:SendToServer(camera.CFrame.LookVector * 500)
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		end
	end
end
return {
	event = "fixed",
	system = espVision,
}
