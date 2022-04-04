-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, TS.getModule(script, "@rbxts", "services"))
local TweenService = _services.TweenService
local Workspace = _services.Workspace
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Projectile = _components.Projectile
local Renderable = _components.Renderable
local Tracker = _components.Tracker
local Transform = _components.Transform
local TweenProps = _components.TweenProps
local update_transforms = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "systems", "update_transforms")
local function projectiles_follow_trackers(world)
	for id, transform, projectile, _binding, tween_props, tracker in world:query(Transform, Projectile, Renderable, TweenProps, Tracker) do
		local model = _binding.model
		local ice = model:FindFirstChild("Ice")
		if tracker.target:IsDescendantOf(game) and ice then
			model.Parent = Workspace.Effects
			task.spawn(function()
				task.delay(0.055, function()
					if ice:FindFirstChild("Attachment") then
						ice.Attachment.Trail.Enabled = true
						TweenService:Create(ice, tween_props.data, {
							CFrame = (tracker.target).CFrame,
						}):Play()
					end
				end)
			end)
		else
			world:despawn(id)
		end
	end
end
return {
	system = projectiles_follow_trackers,
	after = { update_transforms },
}
