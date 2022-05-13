-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local component = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).component
local _variant = TS.import(script, TS.getModule(script, "@rbxts", "variant").out)
local variantModule = _variant.default
local fields = _variant.fields
--[[
	*
	* TODO:
	* Add Attack component
	* Add fn extract_ability(AbilityInput::{Primary, Secondary, Auxillary(n: number)}) {}
]]
local Ability = component()
local Agency = component()
local Block = component()
local CombatStats = component()
local Counter = component()
local Shape = variantModule({
	Box = fields(),
	Radius = fields(),
	Cylinder = fields(),
	Sphere = fields(),
	Disc = fields(),
	Custom = function(part)
		return part
	end,
})
local Collision = component()
local DamageArea = component()
local Effect = component()
local Equipped = component()
local Float = component()
local HitScan = component()
local KnockBack = component()
local ImpactEffect = component()
local InBackpack = component()
local Item = component()
local Lifetime = component()
local Mass = component()
local Mastery = component()
local Mob = component()
local PerkVariant = variantModule({
	LonelyWarrior = {},
	Clone = fields(),
})
local Perk = component()
local Projectile = component()
local Prompt = component()
local Renderable = component()
local Replicate = component()
local Rotation = component()
local ShadowClone = component()
local Soul = component()
local StatusEffect = component()
local Steer = component()
local Strafing = component()
local SufferDamage = component()
local Target = component()
local Team = component()
local Tracker = component()
local Transform = component()
local TweenProps = component()
local UseAbility = component()
local Velocity = component()
local WantsMelee = component()
local WantsOpenInventory = component()
local WantsPickUp = component()
-- make a new component for Player with a field for health
-- also make a type for it
return {
	Ability = Ability,
	Agency = Agency,
	Block = Block,
	CombatStats = CombatStats,
	Counter = Counter,
	Shape = Shape,
	Collision = Collision,
	DamageArea = DamageArea,
	Effect = Effect,
	Equipped = Equipped,
	Float = Float,
	HitScan = HitScan,
	KnockBack = KnockBack,
	ImpactEffect = ImpactEffect,
	InBackpack = InBackpack,
	Item = Item,
	Lifetime = Lifetime,
	Mass = Mass,
	Mastery = Mastery,
	Mob = Mob,
	PerkVariant = PerkVariant,
	Perk = Perk,
	Projectile = Projectile,
	Prompt = Prompt,
	Renderable = Renderable,
	Replicate = Replicate,
	Rotation = Rotation,
	ShadowClone = ShadowClone,
	Soul = Soul,
	StatusEffect = StatusEffect,
	Steer = Steer,
	Strafing = Strafing,
	SufferDamage = SufferDamage,
	Target = Target,
	Team = Team,
	Tracker = Tracker,
	Transform = Transform,
	TweenProps = TweenProps,
	UseAbility = UseAbility,
	Velocity = Velocity,
	WantsMelee = WantsMelee,
	WantsOpenInventory = WantsOpenInventory,
	WantsPickUp = WantsPickUp,
}
