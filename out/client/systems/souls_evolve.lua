-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Mastery = _components.Mastery
local Soul = _components.Soul
local Target = _components.Target
local souls_db = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "souls_db").souls_db
local function souls_evolve(world)
	for id, soul, mastery in world:query(Soul, Mastery, Target) do
		local exp_needed = souls_db[soul.name].evolutions:get(mastery.lvl + 1):match(function(n)
			return n
		end, function()
			return 0
		end)
		if exp_needed <= mastery.exp then
			continue
		else
			world:insert(id, mastery:patch({
				lvl = mastery.lvl + 1,
				exp = exp_needed - mastery.exp,
			}))
		end
	end
end
return {
	souls_evolve = souls_evolve,
}
