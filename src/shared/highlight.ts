import Plasma from "@rbxts/plasma";

interface HighlightOptions {
	OutlineTransparency: number;
}

export = Plasma.widget((opt: HighlightOptions) => {
	const highlightInstance = Plasma.useInstance(() => {
		return Plasma.create("Highlight", {
			FillTransparency: 1,
			FillColor: Color3.fromRGB(255, 255, 255),
			OutlineTransparency: opt.OutlineTransparency,
		});
	});

	return highlightInstance;
});
