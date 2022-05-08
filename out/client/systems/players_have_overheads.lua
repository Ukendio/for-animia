-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Plasma = TS.import(script, TS.getModule(script, "@rbxts", "plasma").out)
local useInstance = TS.import(script, TS.getModule(script, "@rbxts", "plasma").out.Runtime).useInstance
local Players = TS.import(script, TS.getModule(script, "@rbxts", "services")).Players
local _components = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "components")
local Renderable = _components.Renderable
local Target = _components.Target
local function players_have_overheads(world, controls, root)
	for _, _binding in world:query(Renderable, Target) do
		local model = _binding.model
		local head = model:FindFirstChild("Head")
		if head then
			Plasma.start(root, function()
				local _renderer = Players:GetPlayerFromCharacter(model)
				if _renderer ~= nil then
					_renderer = _renderer:FindFirstChild("PlayerGui")
				end
				local renderer = _renderer
				if not renderer then
					return nil
				end
				Plasma.portal(renderer, function()
					local _binding_1 = Plasma.widget(function()
						local opened, set_opened = Plasma.useState(false)
						local instance = useInstance(function()
							return Plasma.create("BillboardGui", {
								Active = true,
								Adornee = head,
								Size = UDim2.fromScale(5, 2),
								StudsOffset = Vector3.new(0, 3, 0),
								[1] = Plasma.create("TextButton", {
									Size = UDim2.fromScale(1, 0.5),
									Activated = function()
										set_opened(function(last)
											return not last
										end)
									end,
								}),
								[2] = Plasma.create("Frame", {
									Size = UDim2.fromScale(1, 0.5),
									AnchorPoint = Vector2.new(0, 1),
									Position = UDim2.fromScale(0, 1),
									BackgroundTransparency = if opened then 0 else 1,
								}),
							})
						end)
						return {
							opened = opened,
						}
					end)()
					local opened = _binding_1.opened
					if opened == true then
					end
					Plasma.arrow(Vector3.zero, Vector3.new(10, 0, 0))
					-- create a plasma arrow
					Plasma.arrow(Vector3.zero, Vector3.new(10, 0, 0))
					-- create 5 plasma arrows in a row
					Plasma.arrow(Vector3.zero, Vector3.new(1))
				end)
			end)
		end
	end
end
return {
	players_have_overheads = players_have_overheads,
}
