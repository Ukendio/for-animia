-- Compiled with roblox-ts v1.3.3-dev-230088d
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
