<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local dust = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects", "bin", "dust").dust
local playEffect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "playEffect").playEffect
return playEffect("Dust", dust)
