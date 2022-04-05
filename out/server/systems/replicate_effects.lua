-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useEvent
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local match = TS.import(script, TS.getModule(script, "@rbxts", "variant").out).match
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components").Effect
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "remotes").remotes
local create_fx = remotes.Server:Get("create_fx")
local replicate_fx = remotes.Server:Get("replicate_fx")
local function replicate_effects(world)
	for _, plr, effect in useEvent("create_fx", create_fx) do
		local creator, variant, target, pos
		match(effect.variant, {
			Damage = function()
				world:spawn(Effect({
					creator = Option:wrap(creator),
					variant = variant,
					target = Option:wrap(target),
					pos = Option:wrap(pos),
				}))
			end,
			default = function()
				return replicate_fx:SendToAllPlayersExcept(plr, effect)
			end,
		})
		local _binding = effect
		creator = _binding.creator
		variant = _binding.variant
		target = _binding.target
		pos = _binding.pos
	end
end
return {
	replicate_effects = replicate_effects,
}
