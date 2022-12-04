-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local match = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").match
local lastDashed = os.clock()
local function sprintDash(world, client)
	if client.lastProcessedCommand then
		match(client.lastProcessedCommand, {
			KeyDown = function(_param)
				local key = _param.key
				if key == Enum.KeyCode.LeftShift then
					client.isRunning = true
				end
			end,
			KeyUp = function(_param)
				local key = _param.key
				if key == Enum.KeyCode.LeftShift then
					client.isRunning = false
				end
			end,
			default = function() end,
		})
	end
	if client.isRunning then
		lastDashed = os.clock()
		client.character.Humanoid.WalkSpeed = 35
		return nil
	end
	client.character.Humanoid.WalkSpeed = 20
end
return {
	system = sprintDash,
	event = "fixed",
}
