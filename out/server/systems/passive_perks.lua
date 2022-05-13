-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local match = TS.import(script, TS.getModule(script, "@rbxts", "variant").out).match
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Agency = _components.Agency
local Mastery = _components.Mastery
local Perk = _components.Perk
local Renderable = _components.Renderable
local lonely_warrior, clone_me
local function passive_perks(world)
	for id, _binding, renderable in world:query(Perk, Renderable) do
		local variant = _binding.variant
		local character = renderable.model
		match(variant, {
			LonelyWarrior = function()
				return lonely_warrior(world, id, character)
			end,
			Clone = function()
				return clone_me(world, id)
			end,
		})
	end
end
local base_stats
function lonely_warrior(world, id, character)
	local mastery = world:get(id, Mastery)
	if not mastery then
		return nil
	end
	local stats = base_stats(mastery.lvl)
	local allies = {}
	for target, renderable in world:query(Renderable, Agency) do
		if id == target then
			continue
		end
		local _position = renderable.model:GetPivot().Position
		local _position_1 = character:GetPivot().Position
		if (_position - _position_1).Magnitude < 20 then
			table.insert(allies, target)
		end
	end
	world:insert(id, stats:patch({
		damage = if #allies > 0 then stats.damage * 0.9 ^ (#allies) else stats.damage * 1.5,
	}))
end
function clone_me(world, id)
end
return {
	passive_perks = passive_perks,
}
