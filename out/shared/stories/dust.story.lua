-- Compiled with roblox-ts v1.3.3-dev-5633519
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local dust = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "bin", "dust").dust
local playEffect = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "playEffect").playEffect
return playEffect("Dust", dust)
