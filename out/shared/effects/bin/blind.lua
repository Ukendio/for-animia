-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local player = Players.LocalPlayer
local function blind(source, duration)
	if source == player then
		return nil
	end
	local blindness = Instance.new("ScreenGui")
	blindness.IgnoreGuiInset = true
	local whiteFrame = Instance.new("Frame")
	whiteFrame.BackgroundColor3 = Color3.fromRGB(245, 245, 166)
	whiteFrame.Size = UDim2.fromScale(1, 1)
	whiteFrame.Parent = blindness
	task.spawn(function()
		blindness.Parent = player:WaitForChild("PlayerGui")
		task.delay(duration, function()
			blindness:Destroy()
		end)
	end)
end
return {
	blind = blind,
}
