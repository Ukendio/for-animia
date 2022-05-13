-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local component = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).component
local Vec = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Vec
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local match = TS.import(script, TS.getModule(script, "@rbxts", "variant").out).match
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Agency = _components.Agency
local CombatStats = _components.CombatStats
local Mastery = _components.Mastery
local Mob = _components.Mob
local Perk = _components.Perk
local PerkVariant = _components.PerkVariant
local Renderable = _components.Renderable
local ShadowClone = _components.ShadowClone
local BLACKLIST = {
	[55099692] = { "David", "Sinner" },
	[1177286754] = { "Aj", "Runner" },
	[63510777] = { "Kenny", "Clown" },
	[82439951] = { "Khervin", "Simp" },
	[1440270567] = { "Wilson", "Lonely" },
	[259292308] = { "Keith", "Dumb" },
}
local Rogue = component()
local dyn_cached_players = {}
local base_stats
local function blacklist_rogues(world)
	for id, _binding in world:query(Agency, CombatStats, Renderable) do
		local player = _binding.player
		if dyn_cached_players[player] ~= nil then
			return nil
		end
		local rogue_data = BLACKLIST[player.UserId]
		if rogue_data == nil then
			return nil
		end
		local _binding_1 = rogue_data
		local name = _binding_1[1]
		local tag = _binding_1[2]
		world:insert(id, Rogue({
			name = name,
			tag = tag,
		}))
		dyn_cached_players[player] = true
	end
	for id, _binding, renderable, combat_stats, mastery in world:query(Rogue, Renderable, CombatStats, Mastery):without(Perk) do
		local name = _binding.name
		local character = renderable.model
		world:insert(id, Perk({
			variant = match({
				type = name,
			}, {
				David = function()
					return PerkVariant.LonelyWarrior
				end,
				Aj = PerkVariant.LonelyWarrior,
				Kenny = function()
					local stats = base_stats(mastery.lvl)
					character.RightUpperLeg.Transparency = 1
					character.RightLowerLeg.Transparency = 1
					character.RightFoot.Transparency = 1
					world:insert(id, stats:patch({
						max_hp = stats.max_hp * 0.85,
					}))
					return PerkVariant.LonelyWarrior
				end,
				Khervin = PerkVariant.LonelyWarrior,
				Wilson = PerkVariant.LonelyWarrior,
				Keith = function()
					local dummy = character:Clone()
					dummy.Parent = Workspace
					local cloned = world:spawn(Mob(), Renderable({
						model = dummy,
					}), combat_stats:patch({
						hp = combat_stats.max_hp * 0.5,
						max_hp = combat_stats.max_hp * 0.5,
						damage = combat_stats.damage * 0.5,
					}), ShadowClone())
					return PerkVariant.LonelyWarrior
				end,
			}),
		}))
	end
end
local function david_debuff(world)
end
local function aj_debuff(world)
end
local function kenny_debuff(combat_stats, character)
end
local function khervin_debuff(world)
end
local function wilson_debuff(world, id, character)
	local mastery = world:get(id, Mastery)
	if not mastery then
		return nil
	end
	local stats = base_stats(mastery.lvl)
	local allies = Vec:vec()
	for target, renderable in world:query(Renderable, Agency) do
		if id == target then
			continue
		end
		local _position = renderable.model:GetPivot().Position
		local _position_1 = character:GetPivot().Position
		if (_position - _position_1).Magnitude < 20 then
			allies:push(target)
		end
	end
	world:insert(id, stats:patch({
		damage = if allies:len() > 0 then stats.damage * 0.9 ^ allies:len() else stats.damage * 1.5,
	}))
end
local function keith_debuff(world)
end
return {
	blacklist_rogues = blacklist_rogues,
	Rogue = Rogue,
}
