-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Plasma = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "plasma", "src")
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local RunService = _services.RunService
local Workspace = _services.Workspace
local function playEffect(title, fn, ...)
	local args = { ... }
	return function(target)
		local root = Plasma.new(target)
		local attachmentsToRemove = {}
		local connection = RunService.Heartbeat:Connect(function()
			Plasma.start(root, function()
				Plasma.window(title, function()
					if Plasma.button("Click Me"):clicked() then
						local attachment = Instance.new("Attachment")
						attachment.Parent = Workspace.Terrain
						local _cFrame = Workspace.CurrentCamera.CFrame
						local _cFrame_1 = CFrame.new(0, 0, -12)
						attachment.CFrame = _cFrame * _cFrame_1
						table.insert(attachmentsToRemove, attachment)
						local particle = fn(unpack(args))
						particle.Parent = attachment
						task.delay(particle.Lifetime.Max + 0.25, function()
							return attachment:Destroy()
						end)
					end
				end)
			end)
		end)
		return function()
			connection:Disconnect()
			connection = nil
			Plasma.start(root, function() end)
			local _arg0 = function(attachment)
				attachment.Parent = nil
				return attachment.Parent
			end
			for _k, _v in attachmentsToRemove do
				_arg0(_v, _k - 1, attachmentsToRemove)
			end
		end
	end
end
return {
	playEffect = playEffect,
}
