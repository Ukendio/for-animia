-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local component = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").component
local Agency = component("Agency")
local Charge = component("Charge")
local Collision = component("Collision")
local CombatStats = component("CombatStats")
local DebugAdornment = component("DebugAdornment")
local Effect = component("Effect")
local ImpactEffect = component("ImpactEffect")
local Lifetime = component()
local Mob = component()
local Projectile = component("Projectile")
local Renderable = component("Renderable")
local SplashDamage = component()
local Transform = component("Transform")
local Velocity = component("Velocity")
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
}
