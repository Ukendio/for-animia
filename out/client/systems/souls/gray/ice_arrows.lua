-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useEvent = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useEvent
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local Players = _services.Players
local ReplicatedStorage = _services.ReplicatedStorage
local UserInputService = _services.UserInputService
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Projectile = _components.Projectile
local Renderable = _components.Renderable
local Soul = _components.Soul
local Tracker = _components.Tracker
local Transform = _components.Transform
local TweenProps = _components.TweenProps
local ice_hit = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "effects_db", "ice_hit").ice_hit
local remotes = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "remotes")
local create_fx = remotes.Client:Get("CreateFX")
local replicate_fx = remotes.Client:Get("ReplicateFX")
local function ice_arrows(world, state)
	for _, soul, _binding in world:query(Soul, Renderable) do
		local model = _binding.model
		if soul.name == "Gray" then
			for _1, _binding_1 in useEvent(UserInputService, "InputBegan") do
				local KeyCode = _binding_1.KeyCode
				if KeyCode == state.use_ability_1 then
					local mouse_hit = Players:GetPlayerFromCharacter(model):GetMouse().Hit
					create_fx:SendToServer("IceArrows", mouse_hit.Position)
				end
			end
		end
	end
	for _, child in useEvent(Workspace.Effects, "ChildAdded") do
		if child.Name == "IceArrows" .. "_server" then
			local ice = ReplicatedStorage.Assets.Particles.Ice.Ice:Clone()
			ice.BrickColor = BrickColor.Blue()
			ice.Attachment.Trail.Enabled = false
			local ice_model = Instance.new("Model")
			ice.Parent = ice_model
			ice_model.PrimaryPart = ice
			ice.Transparency = 1
			local target = child.PrimaryPart
			if target then
				world:spawn(Transform({
					cf = target.CFrame,
				}), Projectile(), Renderable({
					model = ice_model,
				}), TweenProps({
					data = TweenInfo.new(0.0055, Enum.EasingStyle.Linear, Enum.EasingDirection.Out),
				}), Tracker({
					target = target,
				}))
			end
		end
	end
	for _, ability_name, pos in useEvent(replicate_fx, replicate_fx) do
		if ability_name == "IceHit" then
			ice_hit(pos)
		end
	end
end
return {
	ice_arrows = ice_arrows,
}
