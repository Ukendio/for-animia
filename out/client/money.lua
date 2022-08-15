-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local _roact_hooked = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-hooked", "src")
local useState = _roact_hooked.useState
local withHooks = _roact_hooked.withHooks
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local ShadowedButton = TS.import(script, game:GetService("ReplicatedStorage"), "Client", "shadowedButton").default
local player = Players.LocalPlayer
local function Money()
	local menuOpened, setMenuState = useState(false)
	return Roact.createElement("Frame", {
		Size = UDim2.fromScale(1, 1),
		BackgroundTransparency = 1,
		ZIndex = 1,
	}, {
		Roact.createElement(ShadowedButton, {
			name = "Add",
			anchorPoint = Vector2.new(0, 0.5),
			icon = Roact.createFragment({
				Title = Roact.createElement("TextLabel", {
					AnchorPoint = Vector2.new(0.5, 0),
					BackgroundTransparency = 1,
					Font = Enum.Font.SourceSansBold,
					Position = UDim2.new(0.5, 0, 0, -2),
					Size = UDim2.fromScale(1, 1),
					Text = "+",
					TextColor3 = Color3.fromRGB(255, 255, 255),
					TextSize = 44,
					TextStrokeTransparency = 0,
					ZIndex = 5,
				}),
			}),
			cb = function()
				if menuOpened then
					return nil
				end
				setMenuState(true)
			end,
			bg = Color3.fromRGB(255, 255, 66),
			shadowBg = Color3.fromRGB(66, 66, 66),
			position = UDim2.new(0, 210, 0.5, 0),
			size = UDim2.fromOffset(44, 44),
		}),
		Amount = Roact.createElement("Frame", {
			AnchorPoint = Vector2.new(0, 0.5),
			BackgroundTransparency = 0,
			BackgroundColor3 = Color3.fromRGB(255, 255, 255),
			Position = UDim2.new(0, 10, 0.5, 0),
			Size = UDim2.new(0, 190, 0, 44),
		}, {
			Icon = Roact.createElement("ImageLabel", {
				AnchorPoint = Vector2.new(0, 0.5),
				BackgroundTransparency = 1,
				Image = "rbxassetid://2048193204",
				Position = UDim2.new(0, 4, 0.5, 0),
				Size = UDim2.new(0.8, 0, 0.8, 0),
				SizeConstraint = Enum.SizeConstraint.RelativeYY,
				ZIndex = 2,
			}),
			Roact.createElement("UICorner"),
			Title = Roact.createElement("TextLabel", {
				AnchorPoint = Vector2.new(0, 0.5),
				BackgroundTransparency = 1,
				Font = Enum.Font.SourceSansBold,
				Position = UDim2.new(0, 44, 0.5, 0),
				Size = UDim2.new(1, -50, 0, 30),
				Text = "0",
				TextColor3 = Color3.fromRGB(255, 255, 255),
				TextScaled = true,
				TextSize = 30,
				TextStrokeTransparency = 0,
				TextWrapped = true,
				TextXAlignment = Enum.TextXAlignment.Left,
				ZIndex = 5,
			}),
		}),
		Roact.createElement(ShadowedButton, {
			name = "Sell",
			size = UDim2.fromOffset(80, 44),
			anchorPoint = Vector2.new(0, 0.5),
			icon = Roact.createElement("TextLabel", {
				TextSize = 32,
				TextColor3 = Color3.fromRGB(255, 255, 255),
				Font = Enum.Font.SourceSansBold,
				Position = UDim2.fromScale(0.5, 0.5),
				AnchorPoint = Vector2.new(0.5, 0.5),
				Text = "SELL",
				TextStrokeTransparency = 0,
			}),
			position = UDim2.new(0, 10, 0.5, -52),
			cb = function()
				local _character = player
				if _character ~= nil then
					_character = _character.Character
				end
				local character = _character
				if character and player:IsDescendantOf(game) then
					local _fn = character
					local _cFrame = CFrame.new()
					local _vector3 = Vector3.new(0, 4, 0)
					_fn:PivotTo(_cFrame + _vector3)
				end
			end,
			shadowBg = Color3.fromRGB(66, 66, 66),
			bg = Color3.fromRGB(26, 206, 106),
		}),
		Menu = Roact.createElement("Frame", {
			AnchorPoint = Vector2.new(0.5, 0.5),
			BackgroundTransparency = 0,
			BackgroundColor3 = Color3.fromRGB(255, 255, 255),
			Position = UDim2.new(0.5, 0, 0.5, 0),
			Size = UDim2.new(0, 400, 0, 315),
			Visible = menuOpened,
			ZIndex = 4,
		}, {
			Prompt = Roact.createElement("Frame", {
				BackgroundTransparency = 1,
				Position = UDim2.new(0, 0, 1, 10),
				Size = UDim2.new(1, 0, 0, 30),
				Visible = false,
				ZIndex = 2,
			}, {
				Label = Roact.createElement("TextLabel", {
					BackgroundTransparency = 1,
					Font = Enum.Font.SourceSansBold,
					Size = UDim2.new(1, 0, 1, 0),
					Text = "Uh-oh, seems like you've run out of filmbux!",
					TextColor3 = Color3.fromRGB(255, 255, 255),
					TextSize = 20,
					ZIndex = 3,
				}),
			}),
			Roact.createElement("UICorner"),
			Roact.createElement(ShadowedButton, {
				name = "Close",
				bg = Color3.fromRGB(255, 23, 68),
				size = UDim2.fromOffset(36, 36),
				icon = Roact.createElement("TextLabel", {
					BackgroundTransparency = 1,
					Font = Enum.Font.SourceSansBold,
					LayoutOrder = 1,
					Size = UDim2.new(0, 36, 0, 36),
					Text = "X",
					TextColor3 = Color3.fromRGB(255, 255, 255),
					TextSize = 28,
					ZIndex = 5,
					TextStrokeTransparency = 0,
				}),
				anchorPoint = Vector2.new(1, 0),
				position = UDim2.new(1, -10, 0, 10),
				cb = function()
					setMenuState(false)
				end,
			}),
			List = Roact.createElement("Frame", {
				Size = UDim2.new(0, 382, 1, 0),
				BackgroundTransparency = 1,
				Position = UDim2.fromOffset(10, 58),
			}, {
				Roact.createElement("UIGridLayout", {
					CellPadding = UDim2.fromOffset(10, 10),
					CellSize = UDim2.fromOffset(120, 120),
					FillDirection = Enum.FillDirection.Horizontal,
					FillDirectionMaxCells = 3,
					SortOrder = Enum.SortOrder.LayoutOrder,
					StartCorner = Enum.StartCorner.TopLeft,
					VerticalAlignment = Enum.VerticalAlignment.Top,
				}),
				Roact.createElement(ShadowedButton, {
					icon = Roact.createElement("Frame", {
						Size = UDim2.fromScale(1, 1),
						BackgroundTransparency = 1,
					}, {
						Title = Roact.createElement("TextLabel", {
							Text = "1,600",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(255, 255, 255),
							TextSize = 34,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
						}),
						Cost = Roact.createElement("TextLabel", {
							Text = "19 R$",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(0, 230, 118),
							TextSize = 22,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
							Position = UDim2.new(0, 0, 1, -36),
						}),
						Img = Roact.createElement("ImageLabel", {
							AnchorPoint = Vector2.new(0.5, 0),
							BackgroundTransparency = 1,
							Image = "rbxassetid://1705905425",
							Position = UDim2.new(0.5, 0, 0, 44),
							Size = UDim2.new(1, -70, 1, -70),
							SizeConstraint = Enum.SizeConstraint.RelativeYY,
							ZIndex = 5,
						}),
					}),
					size = UDim2.fromScale(1, 1),
					bg = Color3.fromRGB(3, 169, 244),
				}),
				Roact.createElement(ShadowedButton, {
					icon = Roact.createElement("Frame", {
						Size = UDim2.fromScale(1, 1),
						BackgroundTransparency = 1,
					}, {
						Title = Roact.createElement("TextLabel", {
							Text = "1,600",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(255, 255, 255),
							TextSize = 34,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
						}),
						Cost = Roact.createElement("TextLabel", {
							Text = "19 R$",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(0, 230, 118),
							TextSize = 22,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
							Position = UDim2.new(0, 0, 1, -36),
						}),
						Img = Roact.createElement("ImageLabel", {
							AnchorPoint = Vector2.new(0.5, 0),
							BackgroundTransparency = 1,
							Image = "rbxassetid://1705905425",
							Position = UDim2.new(0.5, 0, 0, 44),
							Size = UDim2.new(1, -70, 1, -70),
							SizeConstraint = Enum.SizeConstraint.RelativeYY,
							ZIndex = 5,
						}),
					}),
					size = UDim2.fromScale(1, 1),
					bg = Color3.fromRGB(3, 169, 244),
				}),
				Roact.createElement(ShadowedButton, {
					icon = Roact.createElement("Frame", {
						Size = UDim2.fromScale(1, 1),
						BackgroundTransparency = 1,
					}, {
						Title = Roact.createElement("TextLabel", {
							Text = "1,600",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(255, 255, 255),
							TextSize = 34,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
						}),
						Cost = Roact.createElement("TextLabel", {
							Text = "19 R$",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(0, 230, 118),
							TextSize = 22,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
							Position = UDim2.new(0, 0, 1, -36),
						}),
						Img = Roact.createElement("ImageLabel", {
							AnchorPoint = Vector2.new(0.5, 0),
							BackgroundTransparency = 1,
							Image = "rbxassetid://1705905425",
							Position = UDim2.new(0.5, 0, 0, 44),
							Size = UDim2.new(1, -70, 1, -70),
							SizeConstraint = Enum.SizeConstraint.RelativeYY,
							ZIndex = 5,
						}),
					}),
					size = UDim2.fromScale(1, 1),
					bg = Color3.fromRGB(3, 169, 244),
				}),
				Roact.createElement(ShadowedButton, {
					icon = Roact.createElement("Frame", {
						Size = UDim2.fromScale(1, 1),
						BackgroundTransparency = 1,
					}, {
						Title = Roact.createElement("TextLabel", {
							Text = "1,600",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(255, 255, 255),
							TextSize = 34,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
						}),
						Cost = Roact.createElement("TextLabel", {
							Text = "19 R$",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(0, 230, 118),
							TextSize = 22,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
							Position = UDim2.new(0, 0, 1, -36),
						}),
						Img = Roact.createElement("ImageLabel", {
							AnchorPoint = Vector2.new(0.5, 0),
							BackgroundTransparency = 1,
							Image = "rbxassetid://1705905425",
							Position = UDim2.new(0.5, 0, 0, 44),
							Size = UDim2.new(1, -70, 1, -70),
							SizeConstraint = Enum.SizeConstraint.RelativeYY,
							ZIndex = 5,
						}),
					}),
					size = UDim2.fromScale(1, 1),
					bg = Color3.fromRGB(3, 169, 244),
				}),
				Roact.createElement(ShadowedButton, {
					icon = Roact.createElement("Frame", {
						Size = UDim2.fromScale(1, 1),
						BackgroundTransparency = 1,
					}, {
						Title = Roact.createElement("TextLabel", {
							Text = "1,600",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(255, 255, 255),
							TextSize = 34,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
						}),
						Cost = Roact.createElement("TextLabel", {
							Text = "19 R$",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(0, 230, 118),
							TextSize = 22,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
							Position = UDim2.new(0, 0, 1, -36),
						}),
						Img = Roact.createElement("ImageLabel", {
							AnchorPoint = Vector2.new(0.5, 0),
							BackgroundTransparency = 1,
							Image = "rbxassetid://1705905425",
							Position = UDim2.new(0.5, 0, 0, 44),
							Size = UDim2.new(1, -70, 1, -70),
							SizeConstraint = Enum.SizeConstraint.RelativeYY,
							ZIndex = 5,
						}),
					}),
					size = UDim2.fromScale(1, 1),
					bg = Color3.fromRGB(3, 169, 244),
				}),
				Roact.createElement(ShadowedButton, {
					icon = Roact.createElement("Frame", {
						Size = UDim2.fromScale(1, 1),
						BackgroundTransparency = 1,
					}, {
						Title = Roact.createElement("TextLabel", {
							Text = "1,600",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(255, 255, 255),
							TextSize = 34,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
						}),
						Cost = Roact.createElement("TextLabel", {
							Text = "19 R$",
							Size = UDim2.new(1, 0, 0, 42),
							BackgroundTransparency = 1,
							TextColor3 = Color3.fromRGB(0, 230, 118),
							TextSize = 22,
							Font = Enum.Font.SourceSansBold,
							TextStrokeTransparency = 0,
							Position = UDim2.new(0, 0, 1, -36),
						}),
						Img = Roact.createElement("ImageLabel", {
							AnchorPoint = Vector2.new(0.5, 0),
							BackgroundTransparency = 1,
							Image = "rbxassetid://1705905425",
							Position = UDim2.new(0.5, 0, 0, 44),
							Size = UDim2.new(1, -70, 1, -70),
							SizeConstraint = Enum.SizeConstraint.RelativeYY,
							ZIndex = 5,
						}),
					}),
					size = UDim2.fromScale(1, 1),
					bg = Color3.fromRGB(3, 169, 244),
				}),
			}),
			Title = Roact.createElement("TextLabel", {
				Text = "Buy Coins",
				Position = UDim2.fromOffset(15, 10),
				Size = UDim2.new(1, 0, 0, 36),
				BackgroundTransparency = 1,
				TextColor3 = Color3.fromRGB(255, 255, 0),
				TextSize = 26,
				TextStrokeTransparency = 0,
				TextXAlignment = Enum.TextXAlignment.Left,
				Font = Enum.Font.ArialBold,
			}),
		}),
	})
end
local default = withHooks(Money)
return {
	default = default,
}
