export function ghoul_character(model: Model): Model {
	const highlight = new Instance("Highlight");
	highlight.FillTransparency = 0.5;
	highlight.FillColor = Color3.fromRGB(79, 143, 79);
	highlight.OutlineTransparency = 1;
	highlight.Parent = model;

	return model;
}
