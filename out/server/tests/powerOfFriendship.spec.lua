-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- / <reference types="@rbxts/testez/globals" />;
local a = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "fitumi", "out").a
local World = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").World
local Client = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Client
local powerOfFriendship = TS.import(script, game:GetService("ServerScriptService"), "Game", "systems", "powerOfFriendship")
return function()
	local function assertFuzzyEq(a, b)
		local function inner()
			if a == b then
				return true
			end
			local _a = a
			local _exp = typeof(_a)
			local _b = b
			if _exp == typeof(_b) then
				local _a_1 = a
				if type(_a_1) == "number" then
					local dec = 2
					local tens = 10 ^ dec
					return math.floor(a * tens + 0.5) / tens == math.floor(b * tens + 0.5) / tens
				end
			end
			return false
		end
		local innerResult = inner()
		expect(innerResult).to.equal(true)
		return innerResult
	end
	describe("Player with VIP", function()
		it("Lonely player should have 1.5 as rewards multiplier", function()
			local world = World.new()
			world:optimizeQueries()
			local fakePlayer = a.fake()
			fakePlayer.UserId = 1
			local id = world:spawn(Client({
				player = fakePlayer,
				lineSight = Vector3.zero,
				document = {
					rewardsMultiplier = 1,
					bonusMultiplier = 1.5,
				},
			}))
			powerOfFriendship(world)
			expect(world:get(id, Client).document.rewardsMultiplier).equal(1.5)
		end)
		it("Having 5 friends should have 1.65 as rewards multiplier", function()
			local world = World.new()
			world:optimizeQueries()
			local fakePlayer = a.fake()
			fakePlayer.UserId = 1
			local id = world:spawn(Client({
				player = fakePlayer,
				lineSight = Vector3.zero,
				document = {
					rewardsMultiplier = 1,
					bonusMultiplier = 1.5,
				},
			}))
			-- we start the range at two because player userId is going to be 1.
			for i = 2, 6 do
				local fakeFriend = a.fake()
				fakeFriend.UserId = i
				fakeFriend.AccountAge = 30
				a.callTo(fakePlayer.IsFriendsWith, fakePlayer, i):returns(true)
				world:spawnAt(i, Client({
					player = fakeFriend,
					lineSight = Vector3.zero,
					document = {
						rewardsMultiplier = 1,
					},
				}))
			end
			-- We fill remaining players as non-friends, to make sure we don't give bonus when they are not friends
			for i = 7, 10 do
				local fakeFriend = a.fake()
				fakeFriend.UserId = i
				fakeFriend.AccountAge = 30
				a.callTo(fakePlayer.IsFriendsWith, fakePlayer, i):returns(false)
				world:spawnAt(i, Client({
					player = fakeFriend,
					lineSight = Vector3.zero,
					document = {
						rewardsMultiplier = 1,
					},
				}))
			end
			powerOfFriendship(world)
			assertFuzzyEq(world:get(id, Client).document.rewardsMultiplier, 1.65)
		end)
	end)
	describe("Player without VIP", function()
		it("Lonely player should have 1 as rewards multiplier", function()
			local world = World.new()
			world:optimizeQueries()
			local fakePlayer = a.fake()
			fakePlayer.UserId = 1
			local id = world:spawn(Client({
				player = fakePlayer,
				lineSight = Vector3.zero,
				document = {
					rewardsMultiplier = 1,
				},
			}))
			powerOfFriendship(world)
			assertFuzzyEq(world:get(id, Client).document.rewardsMultiplier, 1)
		end)
		it("Having 5 friends should have 1.1 as rewards multiplier", function()
			local world = World.new()
			world:optimizeQueries()
			local fakePlayer = a.fake()
			fakePlayer.UserId = 1
			local id = world:spawn(Client({
				player = fakePlayer,
				lineSight = Vector3.zero,
				document = {
					rewardsMultiplier = 1,
				},
			}))
			-- we start the range at two because player userId is going to be 1.
			for i = 2, 6 do
				local fakeFriend = a.fake()
				fakeFriend.UserId = i
				fakeFriend.AccountAge = 30
				a.callTo(fakePlayer.IsFriendsWith, fakePlayer, i):returns(true)
				world:spawnAt(i, Client({
					player = fakeFriend,
					lineSight = Vector3.zero,
					document = {
						rewardsMultiplier = 1,
					},
				}))
			end
			-- We fill remaining players as non-friends, to make sure we don't give bonus when they are not friends
			for i = 7, 10 do
				local fakeFriend = a.fake()
				fakeFriend.UserId = i
				fakeFriend.AccountAge = 30
				a.callTo(fakePlayer.IsFriendsWith, fakePlayer, i):returns(false)
				world:spawnAt(i, Client({
					player = fakeFriend,
					lineSight = Vector3.zero,
					document = {
						rewardsMultiplier = 1,
					},
				}))
			end
			powerOfFriendship(world)
			assertFuzzyEq(world:get(id, Client).document.rewardsMultiplier, 1.1)
		end)
	end)
end
