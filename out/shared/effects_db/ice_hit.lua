-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local New = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src).New
local Vec = TS.import(script, TS.getModule(script, "@rbxts", "rust-classes").out).Vec
local TweenService = TS.import(script, TS.getModule(script, "@rbxts", "services")).TweenService
local compose_effects = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db").compose_effects
local gradient = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "gradient").gradient
local shards = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "shards").shards
local smoke = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "smoke").smoke
local snowflakes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "snowflakes").snowflakes
local spark = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "spark").spark
local specs = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "specs").specs
local function ice_hit(pos)
	local model = compose_effects(pos, Vec:fromPtr({ spark(ColorSequence.new(Color3.fromRGB(116, 185, 254)), NumberSequence.new({ NumberSequenceKeypoint.new(0, 1.42), NumberSequenceKeypoint.new(1, 10) })), gradient(ColorSequence.new(Color3.fromRGB(124, 197, 254)), NumberSequence.new({ NumberSequenceKeypoint.new(0, 1), NumberSequenceKeypoint.new(1, 10) })), snowflakes(ColorSequence.new(Color3.fromRGB(123, 207, 254)), NumberSequence.new({ NumberSequenceKeypoint.new(0, 0), NumberSequenceKeypoint.new(0.202, 1.25, 1.25), NumberSequenceKeypoint.new(1, 0) })), shards(ColorSequence.new(Color3.fromRGB(126, 195, 254)), NumberSequence.new({ NumberSequenceKeypoint.new(0, 0), NumberSequenceKeypoint.new(0.204, 0.212, 1.12), NumberSequenceKeypoint.new(1, 0) })), smoke(ColorSequence.new(Color3.fromRGB(137, 221, 254)), NumberSequence.new({ NumberSequenceKeypoint.new(0, 1), NumberSequenceKeypoint.new(0.5, 0.75), NumberSequenceKeypoint.new(1, 1) })), specs(ColorSequence.new(Color3.fromRGB(126, 195, 254)), NumberSequence.new({ NumberSequenceKeypoint.new(0, 0), NumberSequenceKeypoint.new(0.199, 1.56, 0.938), NumberSequenceKeypoint.new(1, 0) })) })).once(1, 1, 5, 20, 25, 35)
	local light_src = New("PointLight")({
		Brightness = 2.25,
		Color = Color3.fromRGB(157, 223, 255),
		Range = 8,
		Parent = model.PrimaryPart,
	})
	local _exp = TS.Promise.delay(0.35)
	local _arg0 = function()
		TweenService:Create(light_src, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
			Brightness = 0,
		}):Play()
	end
	_exp:andThen(_arg0)
	return model
end
return {
	ice_hit = ice_hit,
}
