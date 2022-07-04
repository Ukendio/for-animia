-- Compiled with roblox-ts v1.3.3-dev-d657049
local stack = {}
local function newNode(state)
	if state == nil then
		state = {}
	end
	return {}
end
local function destroyNode(node)
	if node.instance ~= nil then
		node.instance:Destroy()
	end
	for _, effect in node.effects do
		if effect.destructor ~= nil then
			effect.destructor()
		end
	end
	for _, child in node.children do
		destroyNode(child)
	end
end
local function newStackFrame(node)
	return {
		node = node,
	}
end
local function scope(level, scopeKey, fn, ...)
	local args = { ... }
	local parentFrame = stack[#stack - 1 + 1]
	local parentNode = parentFrame.node
	local file = debug.info(1 + level, "s")
	local line = debug.info(1 + level, "l")
	local _fn = string
	local _exp = scopeKey
	local _condition = tostring(parentFrame.discriminator)
	if _condition == nil then
		_condition = ""
	end
	local baseKey = _fn.format("%s:%s:%s%d", _exp, _condition, file, line)
	local _result = parentFrame.childCounts
	if _result ~= nil then
		local _result_1 = parentFrame.childCounts
		if _result_1 ~= nil then
			_result_1 = _result_1[baseKey]
		end
		local _condition_1 = _result_1
		if _condition_1 == nil then
			_condition_1 = 0
		end
		_result[baseKey] = _condition_1 + 1
	end
	local key = string.format("%s:%d", baseKey, parentFrame.childCounts[baseKey])
	local _currentNode = parentNode.children
	if _currentNode ~= nil then
		_currentNode = _currentNode[key]
	end
	local currentNode = _currentNode
	if currentNode == nil then
		currentNode = newNode()
		local _result_1 = parentNode.children
		if _result_1 ~= nil then
			local _currentNode_1 = currentNode
			_result_1[key] = _currentNode_1
		end
	end
	currentNode.generation = parentNode.generation
	local _arg0 = newStackFrame(currentNode)
	table.insert(stack, _arg0)
	local success, handle = xpcall(fn, debug.traceback, unpack(args))
	if not success then
		error()
	end
	local _arg0_1 = #stack
	table.remove(stack, _arg0_1 + 1)
	for childKey, childNode in currentNode.children do
		if childNode.generation ~= currentNode.generation then
			destroyNode(childNode)
			local _result_1 = currentNode.children
			if _result_1 ~= nil then
				_result_1[childKey] = nil
			end
		end
	end
	return handle
end
local Runtime
do
	Runtime = setmetatable({}, {
		__tostring = function()
			return "Runtime"
		end,
	})
	Runtime.__index = Runtime
	function Runtime.new(...)
		local self = setmetatable({}, Runtime)
		return self:constructor(...) or self
	end
	function Runtime:constructor()
	end
	function Runtime:default(rootInstance)
		local node = newNode()
		node.instance = rootInstance
		return node
	end
	function Runtime:start(rootNode, fn, ...)
		local args = { ... }
		if #stack > 0 then
			error("LightningSparks.start cannot be called while Lightning.start is already running", 2)
		end
		local handler = function(...)
			local args = { ... }
			local thread = coroutine.running()
			task.defer(function()
				if coroutine.status(thread) ~= "dead" then
					task.spawn(error, "Handler passed to LightningSparks.start yielded")
				end
			end)
			return fn(unpack(args))
		end
		stack[1] = newStackFrame(rootNode)
		scope(2, "root", handler, unpack(args))
		local _arg0 = #stack
		table.remove(stack, _arg0 + 1)
		for childKey, childNode in rootNode.children do
			if childNode.generation ~= rootNode.generation then
				destroyNode(childNode)
				local _result = rootNode.children
				if _result ~= nil then
					_result[childKey] = nil
				end
			end
		end
	end
	function Runtime:widget(fn)
		local file, line = debug.info(2, "sl")
		local scopeKey = string.format("%s+%d", file, line)
		return function(...)
			local args = { ... }
			return scope(2, scopeKey, fn, unpack(args))
		end
	end
	function Runtime:useInstance(creator)
		local node = stack[#stack - 1 + 1].node
	end
	function Runtime:spark(maxCountSparks)
	end
end
return {
	Runtime = Runtime,
}
