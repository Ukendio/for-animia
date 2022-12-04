-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local dust = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects", "bin", "dust").dust
local playEffect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "playEffect").playEffect
return playEffect("Dust", dust)
