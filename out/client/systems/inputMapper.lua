-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useEvent
local UserInputService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").UserInputService
local InputMapperMessage = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "inputMapperMessage").InputMapperMessage
local function inputMapper(_, _param)
	local commandRecord = _param.commandRecord
	for _1, input, gpe in useEvent(UserInputService, "InputBegan") do
		if gpe then
			continue
		end
		if input.KeyCode ~= Enum.KeyCode.Unknown then
			commandRecord.new = InputMapperMessage.KeyDown(input.KeyCode)
			return nil
		elseif input.UserInputType == Enum.UserInputType.MouseButton1 then
			commandRecord.new = InputMapperMessage.PointerClick
			return nil
		end
	end
	commandRecord.new = nil
end
return {
	event = "default",
	system = inputMapper,
}
