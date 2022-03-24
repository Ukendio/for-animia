-- Compiled with roblox-ts v1.3.3
local lerp = (function(a, b, alpha)
	return a + (b - a) * alpha
end)
local quad_beizer = (function(t, p0, p1, p2)
	local l1 = lerp(p0, p1, t)
	local l2 = lerp(p1, p2, t)
	local quad = lerp(l1, l2, t)
	return quad
end)
return {
	quad_beizer = quad_beizer,
}
