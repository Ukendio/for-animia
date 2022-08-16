<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local withHooks = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-hooked", "src").withHooks
local function ShadowedButton(props)
	local _attributes = {
		Size = UDim2.fromScale(1, 1),
		BackgroundTransparency = 1,
		ZIndex = 1,
	}
	local _children = {}
	local _length = #_children
	local _attributes_1 = {
		AnchorPoint = props.anchorPoint,
		AutoButtonColor = false,
		BackgroundTransparency = 0,
		Font = Enum.Font.SourceSansBold,
		LayoutOrder = 1,
		Position = props.position,
		Size = props.size,
		Text = "",
		TextColor3 = Color3.fromRGB(255, 255, 255),
		TextSize = 22,
		BackgroundColor3 = props.shadowBg or Color3.fromRGB(66, 66, 66),
	}
	local _children_1 = {
		Borders = Roact.createElement("UICorner", {
			CornerRadius = UDim.new(0, 8),
		}),
	}
	local _length_1 = #_children_1
	local _attributes_2 = {
		BackgroundColor3 = props.bg,
		Position = UDim2.new(0.5, 0, 0, 0),
		AnchorPoint = Vector2.new(0.5, 0),
		Size = UDim2.new(1, 0, 1, -4),
	}
	local _condition = props.text
	if _condition == nil then
		_condition = ""
	end
	_attributes_2.Text = _condition
	_attributes_2.TextSize = props.textSize
	_attributes_2.TextColor3 = props.textColour
	_attributes_2[Roact.Event.MouseButton1Click] = props.cb
	local _children_2 = {
		Borders = Roact.createElement("UICorner", {
			CornerRadius = UDim.new(0, 8),
		}),
	}
	local _length_2 = #_children_2
	local _child = props.icon
	if type(_child) == "table" then
		if _child.elements ~= nil or _child.props ~= nil and _child.component ~= nil then
			_children_2[_length_2 + 1] = _child
		else
			for _k, _v in _child do
				if type(_k) == "number" then
					_children_2[_length_2 + _k] = _v
				else
					_children_2[_k] = _v
				end
			end
		end
	end
	_children_1[_length_1 + 1] = Roact.createElement("TextButton", _attributes_2, _children_2)
	_children.Shadow = Roact.createElement("TextButton", _attributes_1, _children_1)
	return Roact.createElement("Frame", _attributes, _children)
end
local default = withHooks(ShadowedButton)
return {
	default = default,
}
