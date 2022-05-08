-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local get_or_create = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "get_or_create").get_or_create
return get_or_create(Workspace, "Effects", "Folder")
