-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local useHookState = TS.import(script, TS.getModule(script, "@rbxts", "matter").src.lib).useHookState
local Queue = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "queue").Queue
local function cleanup(data)
	data.connection:Disconnect()
	table.clear(data)
end
local function to_set(list)
	local t = {}
	local _arg0 = function(instance)
		t[instance] = true
		return t
	end
	for _k, _v in ipairs(list) do
		_arg0(_v, _k - 1, list)
	end
	return t
end
local function use_batched_event(instances, event)
	local instances_set = to_set(instances)
	local storage = useHookState(event, function(state)
		local _connections = state.connections
		local _arg0 = function(data)
			cleanup(data)
		end
		for _k, _v in pairs(_connections) do
			_arg0(_v, _k, _connections)
		end
	end)
	if not storage.connections then
		storage.connections = {}
	end
	local _connections = storage.connections
	local _arg0 = function(data, instance)
		if not (instances_set[instance] ~= nil) then
			cleanup(data)
		end
		storage.connections[instance] = nil
	end
	for _k, _v in pairs(_connections) do
		_arg0(_v, _k, _connections)
	end
	local _arg0_1 = function(instance)
		if not (storage.connections[instance] ~= nil) then
			local data = {}
			local queue = Queue.new()
			data.queue = queue
		end
	end
	for _k, _v in ipairs(instances) do
		_arg0_1(_v, _k - 1, instances)
	end
	local current_instance, current_data = next(storage.connections, nil)
	return function()
		local args = nil
		while current_instance ~= nil and current_data ~= nil do
			args = current_data.queue:popFront()
			if args ~= nil then
				current_instance, current_data = next(storage.connections, current_instance)
			end
			if args then
				local _array = { current_instance }
				local _length = #_array
				table.move(args, 1, #args, _length + 1, _array)
				return unpack(_array)
			end
		end
	end
end
return {
	use_batched_event = use_batched_event,
}
