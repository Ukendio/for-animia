-- Compiled with roblox-ts v1.3.3-dev-230088d
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
-- / <reference types="@rbxts/testez/globals" />;
local _matter = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "matter", "lib")
local Loop = _matter.Loop
local World = _matter.World
local RunService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").RunService
local Lifetime = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "components").Lifetime
local lifetimesDie = TS.import(script, game:GetService("ReplicatedStorage"), "Shared", "systems", "lifetimesDie")
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
	describe("lifetimesDie.spec", function()
		it("should despawn entity after 5 seconds", function()
			local world = World.new()
			local id = world:spawn(Lifetime({
				spawnedAt = os.clock(),
				length = 5,
				elapsed = 0,
			}))
			local loop = Loop.new(world)
			loop:scheduleSystem(lifetimesDie)
			loop:begin({
				default = RunService.Heartbeat,
			})
			task.wait(6)
			assertFuzzyEq(world:contains(id), false)
		end)
		it("should keep entity alive before 5 seconds has elapsed", function()
			local world = World.new()
			local id = world:spawn(Lifetime({
				spawnedAt = os.clock(),
				length = 5,
				elapsed = 0,
			}))
			local loop = Loop.new(world)
			loop:scheduleSystem(lifetimesDie)
			loop:begin({
				default = RunService.Heartbeat,
			})
			task.wait(2)
			assertFuzzyEq(world:contains(id), true)
		end)
	end)
end
