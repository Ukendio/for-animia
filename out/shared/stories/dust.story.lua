-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local dust = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "bin", "dust").dust
local playEffect = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "playEffect").playEffect
return playEffect("Dust", dust)
