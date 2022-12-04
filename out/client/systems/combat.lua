-- Compiled with roblox-ts v2.0.4
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useThrottle
local Workspace = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Workspace
local match = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").match
local stackAttack = 0
local resetAttackThreshold = 4
local animationPool = { 11622802115, 11622804603, 11622805548, 11622806762, 11622807792, 11622809030, 11622809776 }
local anim = Instance.new("Animation")
local function attack(character, world)
	local _exp = character.Humanoid.Animator:GetPlayingAnimationTracks()
	local _arg0 = function(a)
		return a:Stop()
	end
	for _k, _v in _exp do
		_arg0(_v, _k - 1, _exp)
	end
	anim.AnimationId = "rbxassetid://" .. tostring(animationPool[stackAttack + 1])
end
local function combat(world, client)
	if not client.lastProcessedCommand then
		return nil
	end
	if useThrottle(0.15) then
		local character = client.character
		local shouldEscape = match(client.lastProcessedCommand, {
			Hold = function(_param)
				local duration = _param.duration
				-- charged attack
				if duration > 0.5 then
					-- aerial
					if client.character.Humanoid.FloorMaterial == nil then
						local origin = character.HumanoidRootPart.Position
						local _fn = Workspace
						local _vector3 = Vector3.new(0, 5)
						local floor = _fn:Raycast(origin, origin + _vector3)
						if floor then
							return nil
						end
					end
					stackAttack = #animationPool - 1
					attack(character, world)
					return false
				end
				return true
			end,
			PointerClick = function()
				stackAttack = 0
				attack(character, world)
				return false
			end,
			DoubleClick = function()
				stackAttack += 1
				print(stackAttack)
				if stackAttack > resetAttackThreshold then
					stackAttack = 0
				end
				attack(character, world)
				return false
			end,
			KeyDown = function(_param)
				local key = _param.key
				if key == Enum.KeyCode.Q then
					print("skill")
				elseif key == Enum.KeyCode.E then
					print("burst")
				end
			end,
			default = function()
				return true
			end,
		})
		if shouldEscape then
			return nil
		end
		client.character.Humanoid.Animator:LoadAnimation(anim):Play()
	end
end
return {
	system = combat,
	event = "default",
}
