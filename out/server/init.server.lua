-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local start = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "start").start
local emitEffects = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "emitEffects").emitEffects
emitEffects(start(script.systems, {}))
