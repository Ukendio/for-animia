-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useEvent
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local UserInputService = _services.UserInputService
local Workspace = _services.Workspace
local InputKind = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "inputMapperMessage").InputKind
local lastPointerClick = -1
local lastHeld = -1
local function translateInput(client, input, gpe)
	if gpe then
		return false
	end
	local hasBegan = input.UserInputState == Enum.UserInputState.Begin
	if input.KeyCode ~= Enum.KeyCode.Unknown then
		client.lastProcessedCommand = (if hasBegan then InputKind.KeyDown else InputKind.KeyUp)(input.KeyCode)
		return true
	elseif input.UserInputType == Enum.UserInputType.MouseButton1 then
		if lastPointerClick == nil then
			lastPointerClick = os.clock()
		end
		local clickedFast = os.clock() - lastPointerClick <= 0.5
		local command = if hasBegan then if clickedFast then InputKind.DoubleClick else InputKind.PointerClick else InputKind.HoldRelease(os.clock() - lastHeld)
		client.lastProcessedCommand = command
		if hasBegan then
			lastPointerClick = os.clock()
			lastHeld = os.clock()
		end
		return true
	end
	return false
end
--[[
	const COMMAND_BEGIN_EVENT = ["InputBegan", "TouchTap"] as const
	const COMMAND_ENDED_EVENT = ["InputEnded", "TouchEnded"] as const
]]
local DUMMY_TOUCH_TAP = {
	UserInputState = Enum.UserInputState.Begin,
	UserInputType = Enum.UserInputType.Touch,
}
local function inputMapper(_, client)
	if not (client.character.Parent == Workspace) then
		return nil
	end
	-- We need to position this above "InputBegan" to detect whether the input is valid
	for _1, input, gpe in useEvent(UserInputService, "InputBegan") do
		local shouldEscape = translateInput(client, input, gpe)
		if shouldEscape then
			return nil
		end
	end
	for _1, _2, gpe in useEvent(UserInputService, "TouchTapInWorld") do
		local shouldEscape = translateInput(client, DUMMY_TOUCH_TAP, gpe)
		if shouldEscape then
			return nil
		end
	end
	for _1, input, gpe in useEvent(UserInputService, "InputEnded") do
		local shouldEscape = translateInput(client, input, gpe)
		if shouldEscape then
			return nil
		end
	end
	client.lastProcessedCommand = nil
end
return {
	event = "default",
	system = inputMapper,
}
