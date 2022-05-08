-- Compiled with roblox-ts v1.3.3
local function get_or_create(parent, name, class_name)
	local instance = parent:FindFirstChild(name)
	if not instance then
		instance = Instance.new(class_name)
		instance.Name = name
		instance.Parent = parent
	end
	return instance
end
return {
	get_or_create = get_or_create,
}
