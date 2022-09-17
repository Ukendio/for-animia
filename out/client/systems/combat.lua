-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local log = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").log
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local UserInputService = _services.UserInputService
local Workspace = _services.Workspace
local match = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").match
local stackAttack = 0
local resetAttackThreshold = 4
local animationPool = { 9722271, 8123412 }
local function basicAttack(options)
	if UserInputService.TouchEnabled then
		return nil
	end
	stackAttack = 0
	log(stackAttack)
end
local function combat(world, client)
	if client.lastProcessedCommand then
		match(client.lastProcessedCommand, {
			HoldRelease = function(_param)
				local duration = _param.duration
				-- aerial
				if client.character.Humanoid.FloorMaterial == nil then
					local origin = client.character.HumanoidRootPart.Position
					local _fn = Workspace
					local _vector3 = Vector3.new(0, 5)
					local floor = _fn:Raycast(origin, origin + _vector3)
					if not floor then
						return nil
					end
				elseif duration > 0.5 then
					basicAttack({
						charge = 10,
					})
				else
					basicAttack({})
				end
			end,
			PointerClick = function()
				return basicAttack()
			end,
			DoubleClick = function()
				stackAttack += 1
				if stackAttack > resetAttackThreshold then
					stackAttack = 0
				end
				log(stackAttack)
			end,
			default = function() end,
		})
	end
end
return {
	system = combat,
	event = "default",
}
