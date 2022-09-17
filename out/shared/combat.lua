-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local component = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").component
local _variant = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out")
local fields = _variant.fields
local variantModule = _variant.variantModule
local DamageContributor = variantModule({
	Solo = function(uid)
		return {
			uid = uid,
		}
	end,
	Group = fields(),
})
local DamageSource = variantModule({
	Buff = function(kind)
		return {
			kind = kind,
		}
	end,
	Melee = {},
	Projectile = {},
	Explosion = {},
	Falling = {},
	Shockwave = {},
	Other = {},
})
local DamageKind
do
	local _inverse = {}
	DamageKind = setmetatable({}, {
		__index = _inverse,
	})
	DamageKind.Piercing = 0
	_inverse[0] = "Piercing"
	DamageKind.Slashing = 1
	_inverse[1] = "Slashing"
	DamageKind.Crushing = 2
	_inverse[2] = "Crushing"
	DamageKind.Energy = 3
	_inverse[3] = "Energy"
end
local Damage = component("Damage")
return {
	DamageContributor = DamageContributor,
	DamageSource = DamageSource,
	DamageKind = DamageKind,
	Damage = Damage,
}
