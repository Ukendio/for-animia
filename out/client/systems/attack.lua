-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useThrottle = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").useThrottle
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local HttpService = _services.HttpService
local Players = _services.Players
local Workspace = _services.Workspace
local Effect = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Effect
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects").EffectVariant
local match = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "variant", "out").match
local abilityMap = {
	[Enum.KeyCode.One] = "ability1",
	[Enum.KeyCode.Two] = "ability2",
	[Enum.KeyCode.Three] = "ability3",
	[Enum.KeyCode.Four] = "ability4",
}
local spatialQueryParams = OverlapParams.new()
spatialQueryParams.FilterType = Enum.RaycastFilterType.Blacklist
local basicAttackCooldown = 0.125
local function attack(world, client)
	local input = client.commandRecord.new
	if input then
		match(input, {
			PointerClick = function()
				local root = client.character:FindFirstChild("HumanoidRootPart")
				if not root then
					return nil
				end
				local origo = root.CFrame
				spatialQueryParams.FilterDescendantsInstances = { client.character }
				local _set = {}
				local _fn = Workspace
				local _arg0 = root.CFrame.LookVector * 4
				local _exp = _fn:GetPartBoundsInBox(origo + _arg0, Vector3.new(4, 4, 4), spatialQueryParams)
				local _arg0_1 = function(v)
					local _result = v.Parent
					if _result ~= nil then
						_result = _result:FindFirstChild("Humanoid")
					end
					if _result then
						return v.Parent
					end
				end
				-- ▼ ReadonlyArray.mapFiltered ▼
				local _newValue = {}
				local _length = 0
				for _k, _v in _exp do
					local _result = _arg0_1(_v, _k - 1, _exp)
					if _result ~= nil then
						_length += 1
						_newValue[_length] = _result
					end
				end
				-- ▲ ReadonlyArray.mapFiltered ▲
				for _, _v in _newValue do
					_set[_v] = true
				end
				local targets = _set
				if useThrottle(basicAttackCooldown) then
					for target in targets do
						world:spawn(Effect({
							predictionGUID = HttpService:GenerateGUID(false),
							variant = EffectVariant.Damage(10),
							target = target,
							source = Players.LocalPlayer,
						}))
					end
				end
			end,
			KeyDown = function(_param)
				local key = _param.key
				local abilityName = abilityMap[key]
				if abilityName then
					client.abilities[abilityName]:map(function(ability)
						if useThrottle(ability.cooldown + ability.channelTime, ability.effect.variant.type) then
							-- We need a new GUID to treat so that the prediction buffer doesn't see this effect
							world:spawn(ability.effect:patch({
								predictionGUID = HttpService:GenerateGUID(false),
							}))
						end
					end)
				end
			end,
			default = function() end,
		})
	end
end
return {
	event = "fixed",
	system = attack,
}
