-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local component = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").component
local Buff = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components", "buff").Buff
local Agent = component("Agent")
local Body = component()
local Charge = component("Charge")
local Client = component("Client")
local Collision = component("Collision")
local CombatStats = component("CombatStats")
local DebugAdornment = component("DebugAdornment")
local Lifetime = component("Lifetime")
local Projectile = component("Projectile")
local Renderable = component("Renderable")
local SplashDamage = component("SplashDamage")
local Transform = component("Transform")
local Todo = component("Todo")
local Velocity = component("Velocity")
local Zone = component("Zone")
return {
	Agent = Agent,
	Buff = Buff,
	Body = Body,
	Charge = Charge,
	Client = Client,
	Collision = Collision,
	CombatStats = CombatStats,
	DebugAdornment = DebugAdornment,
	Lifetime = Lifetime,
	Projectile = Projectile,
	Renderable = Renderable,
	SplashDamage = SplashDamage,
	Transform = Transform,
	Todo = Todo,
	Velocity = Velocity,
	Zone = Zone,
}