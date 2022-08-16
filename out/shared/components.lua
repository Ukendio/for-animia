<<<<<<< HEAD
-- Compiled with roblox-ts v1.3.3-dev-230088d
=======
-- Compiled with roblox-ts v1.3.3-dev-d657049
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local component = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").component
local Agency = component("Agency")
local Charge = component("Charge")
local Collision = component("Collision")
local CombatStats = component("CombatStats")
local DebugAdornment = component("DebugAdornment")
local Effect = component("Effect")
local ImpactEffect = component("ImpactEffect")
<<<<<<< HEAD
local Lifetime = component("Lifetime")
local Mob = component("Mob")
local Projectile = component("Projectile")
local Renderable = component("Renderable")
local SplashDamage = component("SplashDamage")
local Transform = component("Transform")
local Velocity = component("Velocity")
local Zone = component("Zone")
=======
local Lifetime = component()
local Mob = component()
local Projectile = component("Projectile")
local Renderable = component("Renderable")
local SplashDamage = component()
local Transform = component("Transform")
local Velocity = component("Velocity")
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
return {
	Agency = Agency,
	Charge = Charge,
	Collision = Collision,
	CombatStats = CombatStats,
	DebugAdornment = DebugAdornment,
	Effect = Effect,
	ImpactEffect = ImpactEffect,
	Lifetime = Lifetime,
	Mob = Mob,
	Projectile = Projectile,
	Renderable = Renderable,
	SplashDamage = SplashDamage,
	Transform = Transform,
	Velocity = Velocity,
<<<<<<< HEAD
	Zone = Zone,
=======
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
}
