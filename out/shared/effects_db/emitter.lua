-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _fusion = TS.import(script, TS.getModule(script, "@rbxts", "fusion").src)
local New = _fusion.New
local Children = _fusion.Children
local Workspace = TS.import(script, TS.getModule(script, "@rbxts", "services")).Workspace
local function emit_effects(particles, effects_model)
	return {
		once = function(...)
			local emit_counts = { ... }
			local _arg0 = function(emit_count, idx)
				return particles:get(idx):map(function(particle)
					return particle:Emit(emit_count)
				end)
			end
			for _k, _v in ipairs(emit_counts) do
				_arg0(_v, _k - 1, emit_counts)
			end
			return effects_model
		end,
	}
end
local function create_orig()
	return function(particles)
		local part = New("Part")({
			Size = Vector3.one,
			Position = Vector3.new(0, -9999, 0),
			Transparency = 1,
			[Children] = { New("Attachment")({
				[Children] = particles:asPtr(),
			}) },
		})
		return New("Model")({
			PrimaryPart = part,
			[Children] = { part },
			Parent = Workspace,
		})
	end
end
local function compose_effects(effects)
	local orig = create_orig()
	local effects_model = orig(effects)
	return emit_effects(effects, effects_model)
end
-- print 1 to 5
local function count()
	print(1)
	print(2)
	print(3)
end
return {
	emit_effects = emit_effects,
	create_orig = create_orig,
	compose_effects = compose_effects,
}
