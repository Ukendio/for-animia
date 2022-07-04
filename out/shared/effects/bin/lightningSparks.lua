-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local LightningBolt = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "lightning-beams", "src", "LightningBolt")
local RunService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").RunService
local RNG = Random.new()
local function randomVectorOffset(v, maxAngle)
	local _exp = CFrame.lookAt(Vector3.zero, v)
	local _exp_1 = CFrame.Angles(0, 0, RNG:NextNumber(0, 2 * math.pi))
	local _arg0 = CFrame.Angles(math.acos(RNG:NextNumber(math.cos(maxAngle), 1)), 0, 0)
	local _lookVector = (_exp_1 * _arg0).LookVector
	return _exp * _lookVector
end
local LightningSparks
do
	LightningSparks = setmetatable({}, {
		__tostring = function()
			return "LightningSparks"
		end,
	})
	LightningSparks.__index = LightningSparks
	function LightningSparks.new(...)
		local self = setmetatable({}, LightningSparks)
		return self:constructor(...) or self
	end
	function LightningSparks:constructor(lightningBolt, maxSparkCount)
		if maxSparkCount == nil then
			maxSparkCount = 10
		end
		self.lightningBolt = lightningBolt
		self.maxSparkCount = maxSparkCount
		self.enabled = true
		self.minSpeed = 4
		self.maxSpeed = 6
		self.minDistance = 3
		self.maxDistance = 6
		self.minPartsPerSpark = 8
		self.maxPartsPerSpark = 10
		self.sparksN = 0
		self.slotTable = {}
		self.connection = nil
		self.connection = RunService.Heartbeat:Connect(function()
			local _result = self.connection
			if _result ~= nil then
				_result = _result.Connected
			end
			if not _result then
				return nil
			end
			if self.enabled and self.sparksN < self.maxSparkCount then
				local bolt = self.lightningBolt
				if bolt._Parts[1].Parent == nil then
					self:destroy()
					return nil
				end
				local boltParts = bolt._Parts
				local boltPartsN = #boltParts
				local opaqueParts = {}
				for partIdx = 1, boltPartsN do
					if boltParts[partIdx - 1 + 1].Transparency < 0.3 then
						local _arg0 = (partIdx - 0.5) / boltPartsN
						table.insert(opaqueParts, _arg0)
					end
				end
				local minSlot, maxSlot = nil, nil
				if #opaqueParts ~= 0 then
					minSlot, maxSlot = math.ceil(opaqueParts[1] * self.maxSparkCount), math.ceil(opaqueParts[#opaqueParts - 1 + 1] * self.maxSparkCount)
				end
				for _ = 1, RNG:NextInteger(1, self.maxSparkCount - self.sparksN) do
					if #opaqueParts == 0 then
						break
					end
					local availableSlots = {}
					for slot = minSlot, maxSlot do
						if self.slotTable[slot - 1 + 1] == nil then
							table.insert(availableSlots, slot)
						end
					end
					local _ = _
					if #availableSlots ~= 0 then
						local chosenSlot = availableSlots[RNG:NextInteger(1, #availableSlots) - 1 + 1]
						local tRng = RNG:NextNumber(-0.5, 0.5)
						local chosenT = (chosenSlot - 0.5 + tRng) / self.maxSparkCount
						local dist, chosenPart = 10, 1
						for opaqueIdx = 1, #opaqueParts do
							local testDist = math.abs(opaqueParts[opaqueIdx - 1 + 1] - chosenT)
							if testDist < dist then
								dist, chosenPart = testDist, math.floor(opaqueParts[opaqueIdx - 1 + 1] * boltPartsN + 0.5 + 0.5)
							end
						end
						local part = boltParts[chosenPart - 1 + 1]
						local a1, a2 = {}, {}
						local _position = part.Position
						local _rightVector = part.CFrame.RightVector
						local _x = part.Size.X
						local _arg0 = _rightVector * _x * tRng
						a1.WorldPosition = _position + _arg0
						local _worldPosition = a1.WorldPosition
						local _exp = randomVectorOffset(part.CFrame.RightVector, math.pi / 4)
						local _arg0_1 = RNG:NextNumber(self.minDistance, self.maxDistance)
						a2.WorldPosition = _worldPosition + (_exp * _arg0_1)
						local _worldPosition_1 = a2.WorldPosition
						local _worldPosition_2 = a1.WorldPosition
						a1.WorldAxis = (_worldPosition_1 - _worldPosition_2).Unit
						a2.WorldAxis = a1.WorldAxis
						local spark = LightningBolt.new(a1, a2, RNG:NextInteger(self.minPartsPerSpark, self.maxPartsPerSpark))
						spark.MinRadius, spark.MaxRadius = 0, 0.8
						spark.AnimationSpeed = 0
						spark.Thickness = part.Size.Y / 2
						spark.MinThicknessMultiplier, spark.MaxThicknessMultiplier = 1, 1
						spark.PulseLength = 0.5
						spark.PulseSpeed = RNG:NextNumber(self.minSpeed, self.maxSpeed)
						spark.FadeLength = 0.25
						local H, S, V = Color3.toHSV(part.Color)
						spark.Color = Color3.fromHSV(H, S, V)
						self.slotTable[chosenSlot - 1 + 1] = spark
					end
				end
			end
			local slotsInuse = 0
			local _slotTable = self.slotTable
			local _arg0 = function(v, i)
				if v._Parts[1].Parent ~= nil then
					slotsInuse += 1
				else
					self.slotTable[i - 1 + 1] = nil
				end
			end
			for _k, _v in _slotTable do
				_arg0(_v, _k - 1, _slotTable)
			end
			self.sparksN = slotsInuse
		end)
	end
	function LightningSparks:destroy()
		local _result = self.connection
		if _result ~= nil then
			_result:Disconnect()
		end
		self.connection = nil
		setmetatable(self, nil)
	end
end
return {
	LightningSparks = LightningSparks,
}
