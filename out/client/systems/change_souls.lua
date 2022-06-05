-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _matter = TS.import(script, TS.getModule(script, "@rbxts", "matter").lib)
local useEvent = _matter.useEvent
local useThrottle = _matter.useThrottle
local HashMap = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).HashMap
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local UserInputService = _services.UserInputService
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local InBackpack = _components.InBackpack
local Mastery = _components.Mastery
local Renderable = _components.Renderable
local Soul = _components.Soul
local Target = _components.Target
local soul_mastery_cache = HashMap:empty()
local function players_change_souls(world, controls)
	if useThrottle(1.5) then
		for _, _binding in useEvent(UserInputService, "InputBegan") do
			local KeyCode = _binding.KeyCode
			if KeyCode == controls.equip_soul_1 or (KeyCode == controls.equip_soul_2 or KeyCode == controls.equip_soul_3) then
				for plr_id in world:query(Target) do
					for _1, backpack, item_soul in world:query(InBackpack, Soul) do
						if KeyCode == backpack.slot then
							continue
						end
						local mastery = Mastery({
							lvl = 0,
							exp = 0,
						})
						soul_mastery_cache:entry(item_soul):orInsert(mastery)
						world:insert(plr_id, item_soul)
					end
				end
			end
		end
	end
	for id, soul_record in world:queryChanged(Soul) do
		local renderable, mastery, target = world:get(id, Renderable, Mastery, Target)
		if renderable == nil or (mastery == nil or target == nil) then
			continue
		end
		if soul_record.new and soul_record.new ~= soul_record.old then
			local player = Players:GetPlayerFromCharacter(renderable.model)
			if not player then
				continue
			end
			local soul_model = ReplicatedStorage.Assets:FindFirstChild(soul_record.new.name)
			if not soul_model then
				continue
			end
			player.Character = soul_model
			soul_mastery_cache:insert(soul_record.new, mastery)
			world:insert(id, soul_mastery_cache:i(soul_record.new))
		end
	end
end
return {
	players_change_souls = players_change_souls,
}
