-- Compiled with roblox-ts v2.0.4
local PlayerState
do
	local _inverse = {}
	PlayerState = setmetatable({}, {
		__index = _inverse,
	})
	PlayerState.Invincible = 0
	_inverse[0] = "Invincible"
end
return {
	PlayerState = PlayerState,
}
