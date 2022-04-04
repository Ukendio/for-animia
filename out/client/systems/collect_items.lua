-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local InBackpack = _components.InBackpack
local Target = _components.Target
local WantsPickUp = _components.WantsPickUp
local function collect_items(world)
	for id, pickup in world:query(WantsPickUp, Target) do
		if pickup.collected_by == id then
			world:insert(pickup.item, InBackpack({
				owner = pickup.collected_by,
				slot = Enum.KeyCode.Z,
			}))
		end
	end
end
return {
	collect_items = collect_items,
}
