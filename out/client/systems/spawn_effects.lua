-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").lib).useEvent
local Option = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Option
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Effect = _components.Effect
local Replicate = _components.Replicate
local replicate_fx_on_client = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects", "replicate_fx_on_client").replicate_fx_on_client
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "remotes").remotes
local create_fx = remotes.Client:Get("create_fx")
local replicate_fx = remotes.Client:Get("replicate_fx")
local function spawn_effects(world)
	for id, _binding in world:query(Effect, Replicate) do
		local variant = _binding.variant
		local target = _binding.target
		local pos = _binding.pos
		create_fx:SendToServer({
			variant = variant,
			target = target:asPtr(),
			pos = pos:asPtr(),
		})
		print("sending effect to server", id, variant.type)
		world:despawn(id)
		-- send this id to the server, and use it to know whether it was invalid?
		-- potentially do: [_, effect_id] of useEvent("rollback_effect")
	end
	for _, _binding in useEvent("replicate_fx", replicate_fx) do
		local target = _binding.target
		local variant = _binding.variant
		local pos = _binding.pos
		local creator = _binding.creator
		replicate_fx_on_client(world, {
			creator = Option:wrap(creator),
			target = Option:wrap(target),
			variant = variant,
			pos = Option:wrap(pos),
		})
	end
end
return {
	spawn_effects = spawn_effects,
}
