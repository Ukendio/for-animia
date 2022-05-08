-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useEvent
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local ReplicatedStorage = _services.ReplicatedStorage
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Item = _components.Item
local Lifetime = _components.Lifetime
local Mastery = _components.Mastery
local Mob = _components.Mob
local Renderable = _components.Renderable
local Soul = _components.Soul
local SufferDamage = _components.SufferDamage
local function mobs_drop_souls(world)
	for id, _binding, soul, suffer_damage, mastery in world:query(Renderable, Soul, SufferDamage, Mastery, Mob) do
		local model = _binding.model
		local humanoid = model:FindFirstChildOfClass("Humanoid")
		if not humanoid then
			continue
		end
		for _ in useEvent(humanoid, "Died") do
			local soul_model = ReplicatedStorage.Assets:FindFirstChild(soul.name)
			suffer_damage.src:map(function(plr)
				local src = plr:GetAttribute("entity_id")
				local plr_mastery = world:get(src, Mastery)
				world:insert(src, plr_mastery:patch({
					exp = plr_mastery.exp + mastery.lvl,
				}))
			end)
			soul_model.Parent = Workspace
			world:spawn(soul, Item(), Renderable({
				model = soul_model,
			}))
			world:insert(id, Lifetime({
				remaining_time = 3,
			}))
		end
	end
end
return {
	mobs_drop_souls = mobs_drop_souls,
}
