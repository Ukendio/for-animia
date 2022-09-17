-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local log = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").log
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local RunService = _services.RunService
local match = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").match
local player = Players.LocalPlayer
local shouldSprint = false
local lastDashed = os.clock()
local direction = nil
local function sprintDash(world, client)
	if not client.lastProcessedCommand then
		return nil
	end
	match(client.lastProcessedCommand, {
		KeyDown = function(_param)
			local key = _param.key
			if key == Enum.KeyCode.LeftShift then
				lastDashed = os.clock()
				local root = client.character.HumanoidRootPart
				local _cFrame = root.CFrame
				local _lookVector = root.CFrame.LookVector
				direction = _cFrame * _lookVector
			end
		end,
		default = function() end,
	})
	-- should "renew sprint dash"
	log(os.clock() - lastDashed)
	if os.clock() - lastDashed < 0.25 then
		client.character.Humanoid.WalkSpeed = 35
		return nil
	end
	client.character.Humanoid.WalkSpeed = 20
	direction = nil
end
local exports = {
	system = sprintDash,
	event = "fixed",
}
RunService:BindToRenderStep("", Enum.RenderPriority.Character.Value + 1, function()
	if direction then
		player:Move(direction)
	end
end)
return exports
