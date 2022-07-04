-- Compiled with roblox-ts v1.3.3-dev-5633519
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local component = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").component
local Charge = component("Charge")
local Collision = component("Collision")
local CombatStats = component("CombatStats")
local DebugAdornment = component("DebugAdornment")
local Effect = component("Effect")
local ImpactEffect = component("ImpactEffect")
local Projectile = component("Projectile")
local Renderable = component("Renderable")
local SplashDamage = component()
local Target = component("Target")
local Transform = component("Transform")
local Velocity = component("Velocity")
return {
	Charge = Charge,
	Collision = Collision,
	CombatStats = CombatStats,
	DebugAdornment = DebugAdornment,
	Effect = Effect,
	ImpactEffect = ImpactEffect,
	Projectile = Projectile,
	Renderable = Renderable,
	SplashDamage = SplashDamage,
	Target = Target,
	Transform = Transform,
	Velocity = Velocity,
}
