-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local DebugAdornment = _components.DebugAdornment
local Renderable = _components.Renderable
local Components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local cloneTemplate = TS.import(script, script.Parent.Parent, "cloneTemplate")
warn("Press ALT + F4 to toggle debug overlay")
local function debugVision(world, state, ui)
	local transparency = ui.slider(1)
	if not state.debugEnabled then
		for id, debugAdornment in world:query(DebugAdornment) do
			debugAdornment.label:Destroy()
			local _result = debugAdornment.highlight
			if _result ~= nil then
				_result:Destroy()
			end
			world:remove(id, DebugAdornment)
		end
		return nil
	end
	for id, _binding in world:query(Renderable) do
		local model = _binding.model
		local debugAdornment = world:get(id, DebugAdornment)
		if not debugAdornment then
			local label = cloneTemplate()
			label.Parent = model
			label.Adornee = model
			local highlight = Instance.new("Highlight")
			highlight.Parent = model
			highlight.Adornee = model
			highlight.FillTransparency = 1
			highlight.FillColor = Color3.fromRGB(255, 255, 255)
			debugAdornment = DebugAdornment({
				label = label,
				highlight = highlight,
			})
			world:insert(id, debugAdornment)
		end
		local text = ""
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
		debugAdornment.label.TextLabel.Text = text
		debugAdornment.label.TextLabel.TextTransparency = transparency
		if debugAdornment.highlight then
			debugAdornment.highlight.OutlineTransparency = transparency
		end
	end
end
return debugVision
