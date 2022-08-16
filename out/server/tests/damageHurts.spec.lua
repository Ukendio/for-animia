-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- / <reference types="@rbxts/testez/globals" />;
local a = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "fitumi", "out").a
local World = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib").World
local HttpService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").HttpService
local damageHurts = TS.import(script, game:GetService("ServerScriptService"), "Game", "systems", "damageHurts")
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components")
local Client = _components.Client
local CombatStats = _components.CombatStats
local Effect = _components.Effect
local Renderable = _components.Renderable
local EffectVariant = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "effects").EffectVariant
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
	describe("damageHurts.spec", function()
		it("target enemy should have 90 hp left", function()
			local world = World.new()
			local targetModel = a.fake()
			local targetEntity = world:spawn(Renderable({
				model = targetModel,
			}), CombatStats({
				hp = 100,
				maxHp = 100,
				damage = 5,
			}))
			a.callTo(targetModel.GetAttribute, targetModel, "entityId"):returns(targetEntity)
			local player = a.fake()
			local playerEntity = world:spawn(Client())
			a.callTo(player.GetAttribute, player, "entityId"):returns(playerEntity)
			world:spawn(Effect({
				variant = EffectVariant.Damage(10),
				predictionGUID = HttpService:GenerateGUID(false),
				source = player,
				target = targetModel,
			}))
			damageHurts(world)
			assertFuzzyEq(world:get(targetEntity, CombatStats).hp, 90)
		end)
	end)
end
