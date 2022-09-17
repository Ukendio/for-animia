-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local Players = _services.Players
local RunService = _services.RunService
local Client = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Client
local bonusPerFriend = 2 / 100
local function powerOfFriendship(world)
	-- We remove dependence on the Players service to make the system mockable.
	-- But we use the Players service in the live production.
	local players = {}
	if RunService:IsStudio() then
		for _, _binding in world:query(Client):snapshot() do
			local player = _binding.player
			table.insert(players, player)
		end
	else
		players = Players:GetPlayers()
	end
	for id, client in world:query(Client) do
		local clientPlayer = client.player
		if not clientPlayer then
			continue
		end
		local _players = players
		local _arg0 = function(player)
			if player ~= clientPlayer then
				if clientPlayer:IsFriendsWith(player.UserId) and player.AccountAge >= 30 then
					return player
				end
			end
		end
		-- ▼ ReadonlyArray.mapFiltered ▼
		local _newValue = {}
		local _length = 0
		for _k, _v in _players do
			local _result = _arg0(_v, _k - 1, _players)
			if _result ~= nil then
				_length += 1
				_newValue[_length] = _result
			end
		end
		-- ▲ ReadonlyArray.mapFiltered ▲
		local friends = _newValue
		local amountOfFriends = #friends
		local _fn = world
		local _fn_1 = client
		local _object = {}
		local _left = "document"
		local _object_1 = {}
		for _k, _v in client.document do
			_object_1[_k] = _v
		end
		local _left_1 = "rewardsMultiplier"
		local _exp = (1 + amountOfFriends * bonusPerFriend)
		local _condition = client.document.bonusMultiplier
		if _condition == nil then
			_condition = 1
		end
		_object_1[_left_1] = _exp * _condition
		_object[_left] = _object_1
		_fn:insert(id, _fn_1:patch(_object))
	end
end
return powerOfFriendship
