-- Compiled with roblox-ts v1.3.3
local Queue
do
	Queue = setmetatable({}, {
		__tostring = function()
			return "Queue"
		end,
	})
	Queue.__index = Queue
	function Queue.new(...)
		local self = setmetatable({}, Queue)
		return self:constructor(...) or self
	end
	function Queue:constructor(head, tail)
		if head == nil then
			head = nil
		end
		if tail == nil then
			tail = nil
		end
		self.head = head
		self.tail = tail
	end
	function Queue:pushBack(value)
		local _arg0 = {
			value = value,
			next = nil,
		}
		local entry = _arg0
		if self.tail ~= nil then
			self.tail.next = entry
		end
		self.tail = entry
		if self.head == nil then
			self.head = entry
		end
	end
	function Queue:popFront()
		if self.head == nil then
			return nil
		end
		local val = self.head.value
		self.head = self.head.next
		return val
	end
end
return {
	Queue = Queue,
}
