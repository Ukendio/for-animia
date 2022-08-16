-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useEvent
local UserInputService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").UserInputService
local death = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects", "bin", "death").death
local function playDead(world, state)
	for _, _binding, gpe in useEvent(UserInputService, "InputBegan") do
		local KeyCode = _binding.KeyCode
		if gpe then
			continue
		end
		if KeyCode == Enum.KeyCode.G then
			local temp = death(state.character)
			task.delay(50, function()
				temp:Destroy()
			end)
		end
	end
end
return {
	event = "fixed",
	system = playDead,
}
