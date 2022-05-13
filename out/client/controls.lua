-- Compiled with roblox-ts v1.3.3
local key = function(key)
	return Enum.KeyCode[key]
end
local function input_type(key)
	return Enum.UserInputType[key]
end
local controls = {
	equip_soul_1 = key("Z"),
	equip_soul_2 = key("X"),
	equip_soul_3 = key("C"),
	jump = key("Space"),
	strafe_left = key("A"),
	strafe_right = key("D"),
	m1 = input_type("MouseButton1"),
	interact = key("E"),
	toggle_menu = key("G"),
	use_ability_1 = key("One"),
	use_ability_2 = key("Two"),
	use_ability_3 = key("Three"),
	use_ability_4 = key("Four"),
	dash = { key("Q"), key("E") },
	use_block = key("F"),
}
return {
	input_type = input_type,
	key = key,
	controls = controls,
}
