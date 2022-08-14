-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useEvent
local UserInputService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").UserInputService
local InputMapperMessage = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "inputMapperMessage").InputMapperMessage
local function inputMapper(_, state)
	table.remove(state.inputBuffer, 1)
	for _1, input, gpe in useEvent(UserInputService, "InputBegan") do
		if gpe then
			continue
		end
		if input.KeyCode ~= Enum.KeyCode.Unknown then
			local _inputBuffer = state.inputBuffer
			local _arg0 = InputMapperMessage.KeyDown(input.KeyCode)
			table.insert(_inputBuffer, _arg0)
		elseif input.UserInputType == Enum.UserInputType.MouseButton1 then
			local _inputBuffer = state.inputBuffer
			local _pointerClick = InputMapperMessage.PointerClick
			table.insert(_inputBuffer, _pointerClick)
		end
	end
	for _1, input, gpe in useEvent(UserInputService, "InputEnded") do
		if gpe then
			continue
		end
		if input.KeyCode ~= Enum.KeyCode.Unknown then
			local _inputBuffer = state.inputBuffer
			local _arg0 = InputMapperMessage.KeyUp(input.KeyCode)
			table.insert(_inputBuffer, _arg0)
		end
	end
end
return {
	priority = math.huge,
	system = inputMapper,
}
