-- Compiled with roblox-ts v1.3.3
local function ghoul_character(model)
	local highlight = Instance.new("Highlight")
	highlight.FillTransparency = 0.5
	highlight.FillColor = Color3.fromRGB(79, 143, 79)
	highlight.OutlineTransparency = 1
	highlight.Parent = model
	return model
end
return {
	ghoul_character = ghoul_character,
}
