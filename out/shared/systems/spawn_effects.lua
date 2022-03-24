-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Effect = _components.Effect
local Lifetime = _components.Lifetime
local Renderable = _components.Renderable
local Replicate = _components.Replicate
local SufferDamage = _components.SufferDamage
local Velocity = _components.Velocity
local compose_effects = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db").compose_effects
local explosion_1 = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "explosions").explosion_1
local Vec = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Vec
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "remotes")
local create_fx = remotes.Client:Get("CreateFX2")
local replicate_fx = remotes.Client:Get("ReplicateFX2")
local function replicate_fx_on_client(world, _param)
	local effect_type = _param.effect_type
	local effect_payload = _param.effect_payload
	local creator = _param.creator
	local target = _param.target
	local pos = _param.pos
	local _condition = effect_type
	if _condition == nil then
		_condition = effect_payload or (creator or (target or pos))
	end
	local a = _condition
	if effect_type == 0 then
		local _binding = effect_payload
		local damage = _binding.damage
		target:map(function(target)
			return world:insert(target, SufferDamage({
				damage = damage,
				source = creator,
			}))
		end)
	elseif effect_type == 1 then
		local _binding = effect_payload
		local size = _binding.size
		world:spawn(Renderable({
			model = compose_effects(pos:unwrapOr(Vector3.one), Vec:fromPtr({ explosion_1(size) })).once(1),
		}), Lifetime({
			remaining_time = 2,
		}))
	elseif effect_type == 2 then
		local _binding = effect_payload
		local force = _binding.force
		target:map(function(target)
			return world:insert(target, Velocity())
		end)
	end
end
local spawn_effects = {
	priority = 100,
	system = function(world)
		for id, effect in world:query(Effect):without(Replicate) do
			local should_predict = true
			if effect.effect_type == 0 then
				should_predict = false
			end
			world:insert(id, Replicate({
				should_predict = should_predict,
			}))
		end
		for _, effect, _binding in world:query(Effect, Replicate) do
			local should_predict = _binding.should_predict
			local _binding_1 = effect
			local creator = _binding_1.creator
			local effect_type = _binding_1.effect_type
			local effect_payload = _binding_1.effect_payload
			local target = _binding_1.target
			local pos = _binding_1.pos
			if should_predict then
				replicate_fx_on_client(world, effect)
			end
			create_fx:SendToServer({
				creator = creator:asPtr(),
				effect_type = effect_type,
				effect_payload = effect_payload,
				target = target:asPtr(),
				pos = pos:asPtr(),
			})
		end
	end,
}
return {
	spawn_effects = spawn_effects,
}
