local TweenService = game:GetService("TweenService")

local function debugAdornments(attachments, visible) 
    for _, attachment in attachments do 
        local adornment = Instance.new("BillboardGui")
        adornment.AlwaysOnTop = true
        adornment.Enabled = visible
        adornment.Size = UDim2.new(1, 0, 1, 0)

        local textLabel = Instance.new("TextLabel")
        textLabel.Text = attachment.Name
        textLabel.Parent = adornment
        textLabel.Size = UDim2.fromScale(1, 1)
        textLabel.BackgroundTransparency = 1
		textLabel.BorderColor3 = Color3.fromRGB(27, 42, 53)
        textLabel.BorderSizePixel = 1
        textLabel.TextStrokeTransparency =  1
        textLabel.TextColor3 = BrickColor.random().Color
        textLabel.TextSize = 15
        textLabel.TextXAlignment = Enum.TextXAlignment.Left
        textLabel.TextYAlignment = Enum.TextYAlignment.Top
        textLabel.Parent = adornment
 
        adornment.Parent = attachment
    end
end

local function createAttachment(props, host, visible) 
	local attachment = Instance.new("Attachment")

    for k, v in props do 
        attachment[k] = v
    end

    attachment.Visible = visible
    attachment.Parent = host
	
    return attachment
end

local TWEEN_INFO = TweenInfo.new(0.15, Enum.EasingStyle.Linear, Enum.EasingDirection.In)

local function sortAttachments(attachments) 
	local sorted = table.clone(attachments)
	
	table.sort(sorted, function(a, b) 
		return a.Name:lower() < b.Name:lower()
	end)
	
	return sorted
end

local function spline(name, wayPoints, host, visible) 
    local splinePart = Instance.new("Part")
    splinePart.Name = "Spline@"..name
    splinePart.Size = Vector3.new(30, 25, 13.375)
	splinePart.Position = Vector3.new(7, 13, -9.438)
    splinePart.Transparency = 1
    splinePart.Parent = host

    local start = Vector3.one 

    for i, props in wayPoints do
        props.Name = name..i 

        local attachment = createAttachment(props, splinePart, visible)
        attachment.Parent = splinePart

        if i == 1 then 
            start = attachment.WorldPosition
        end
    end

    local trailPart = Instance.new("Part")
    trailPart.Size = Vector3.one
	trailPart.Position = start
	trailPart.Transparency = 1 
	trailPart.Parent = host 
	
	local trail = Instance.new("Trail")
    trail.FaceCamera = false    
    trail.Attachment0 = createAttachment({Name = "0", Position = Vector3.new(trailPart.Size.X / 2, 0)}, trailPart, visible)
    trail.Attachment1 = createAttachment({Name = "1", Position = -Vector3.new(trailPart.Size.X / 2, 0)}, trailPart, visible)
	trail.Parent = trailPart
    trail.Transparency = NumberSequence.new(if visible then 0 else 1)

    task.defer(function()
        debugAdornments(splinePart:GetChildren(), visible)
        for _, attachment in sortAttachments(splinePart:GetChildren()) do 
            local tween = TweenService:Create(trailPart, TWEEN_INFO, {Position = attachment.WorldPosition})
            tween:Play()
            tween.Completed:Wait()
        end
    end)

    return splinePart, trailPart  
end

return function()
	local temp = Instance.new("Part")
	temp.Transparency = 0.95
	temp.BrickColor = BrickColor.Red()
	temp.Size = Vector3.new(30, 25, 13.375)
	temp.Position = Vector3.new(7, 13, -9.438)
	temp.Parent = workspace.Terrain

    spline("a", {
        [1] = { Position = Vector3.new(-10, 10, -5) },
        [2] = { Position = Vector3.new(-10, 0, -5)},
        [3] = { Position = Vector3.new(0, -10, 0)},
        [4] = { Position = Vector3.new(4 , -11, 1.5)},
        [5] = { Position = Vector3.new(2, -8, 3.5)},
        [6] = { Position = Vector3.new(-1, -8, 3.5)}
    }, temp, false)

    spline("b", {
        [1] = { Position = Vector3.new(10, 10, -3) },
        [2] = { Position = Vector3.new(8, 0, -3) },
        [3] = { Position = Vector3.new(0, -11, 2.5) },
        [4] = { 
            Position = Vector3.new(-3, -10, 3.5), 
            Rotation = Vector3.new(90, 90, 0) 
        },
        [5] = { Position = Vector3.new(1, -7, 5.5) }
    }, temp, true)
    
	
	return function() 
        temp:Destroy()
    end
end


