-- Compiled with roblox-ts v1.3.3-dev-d657049
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local CollectionService = _services.CollectionService
local RunService = _services.RunService
local HotReloader
do
	HotReloader = setmetatable({}, {
		__tostring = function()
			return "HotReloader"
		end,
	})
	HotReloader.__index = HotReloader
	function HotReloader.new(...)
		local self = setmetatable({}, HotReloader)
		return self:constructor(...) or self
	end
	function HotReloader:constructor(listeners, clonedModules)
		if listeners == nil then
			listeners = {}
		end
		if clonedModules == nil then
			clonedModules = {}
		end
		self.listeners = listeners
		self.clonedModules = clonedModules
	end
	function HotReloader:destroy()
		local _listeners = self.listeners
		local _arg0 = function(listener)
			return listener:Disconnect()
		end
		for _k, _v in _listeners do
			_arg0(_v, _k - 1, _listeners)
		end
		self.listeners = {}
		local _clonedModules = self.clonedModules
		local _arg0_1 = function(cloned)
			return cloned:Destroy()
		end
		for _k, _v in _clonedModules do
			_arg0_1(_v, _k, _clonedModules)
		end
		self.clonedModules = {}
	end
	function HotReloader:listen(module, fn, cleanup)
		if RunService:IsStudio() then
			local module_changed = module.Changed:Connect(function()
				local _clonedModules = self.clonedModules
				local _module = module
				local mod = _clonedModules[_module]
				if mod then
					cleanup(mod)
					mod:Destroy()
				else
					cleanup(module)
				end
				local cloned = module:Clone()
				CollectionService:AddTag(cloned, "RewireClonedModule")
				cloned.Parent = module.Parent
				local _clonedModules_1 = self.clonedModules
				local _module_1 = module
				_clonedModules_1[_module_1] = cloned
				fn(cloned)
				warn("HotReloaded " .. (module:GetFullName() .. "!"))
			end)
			table.insert(self.listeners, module_changed)
		end
		fn(module)
	end
end
return {
	HotReloader = HotReloader,
}
