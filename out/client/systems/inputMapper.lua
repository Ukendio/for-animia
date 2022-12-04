-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib")
local useDeltaTime = _matter.useDeltaTime
local useEvent = _matter.useEvent
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local UserInputService = _services.UserInputService
local Workspace = _services.Workspace
local translateInput = TS.import(script, game:GetService("ReplicatedStorage"), "Client", "translateInput").translateInput
local InputKind = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "inputMapperMessage").InputKind
local holdDuration = 0
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
	for _1, input, gpe in useEvent(UserInputService, "InputEnded") do
		local shouldEscape = translateInput(client, input, gpe)
		if shouldEscape then
			return nil
		end
	end
	if UserInputService:IsMouseButtonPressed(Enum.UserInputType.MouseButton1) then
		holdDuration += useDeltaTime()
		client.lastProcessedCommand = InputKind.Hold(holdDuration)
		return nil
	end
	holdDuration = 0
	client.lastProcessedCommand = nil
end
return {
	event = "default",
	system = inputMapper,
}
