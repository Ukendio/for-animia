-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local ReplicatedStorage = _services.ReplicatedStorage
local TweenService = _services.TweenService
local Workspace = _services.Workspace
local function ice_hit(pos)
	local hit = ReplicatedStorage.Assets.Particles.Ice.Hit:Clone()
	hit.Position = pos
	hit.Parent = Workspace.Effects
	local orig = hit.Attachment
	orig.Spark:Emit(1)
	orig.Gradient:Emit(1)
	orig.Snowflakes:Emit(5)
	orig.Shards:Emit(20)
	orig.Smoke:Emit(25)
	orig.Specs:Emit(35)
	task.delay(1.2, function()
		hit:Destroy()
	end)
	local _exp = TS.Promise.delay(0.35)
	local _arg0 = function()
		TweenService:Create(orig.PointLight, TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
			Brightness = 0,
		}):Play()
	end
	_exp:andThen(_arg0)
end
return {
	ice_hit = ice_hit,
}
