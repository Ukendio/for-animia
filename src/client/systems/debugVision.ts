import { World } from "@rbxts/matter";
import { ClientState } from "client/game.client";
import { DebugAdornment, Renderable } from "shared/components";
import * as Components from "shared/components";
import cloneTemplate from "client/cloneTemplate";
import { Widgets } from "@rbxts/plasma";

warn("Press ALT + F4 to toggle debug overlay");

function debugVision(world: World, state: ClientState, ui: Widgets): void {
	const transparency = ui.slider(1);

	if (!state.debugEnabled) {
		for (const [id, debugAdornment] of world.query(DebugAdornment)) {
			debugAdornment.label.Destroy();
			debugAdornment.highlight?.Destroy();
			world.remove(id, DebugAdornment);
		}
		return;
	}

	for (const [id, { model }] of world.query(Renderable)) {
		let debugAdornment = world.get(id, DebugAdornment);

		if (!debugAdornment) {
			const label = cloneTemplate();
			label.Parent = model;
			label.Adornee = model;

			const highlight = new Instance("Highlight");
			highlight.Parent = model;
			highlight.Adornee = model;
			highlight.FillTransparency = 1;
			highlight.FillColor = Color3.fromRGB(255, 255, 255);

			debugAdornment = DebugAdornment({ label, highlight });

			world.insert(id, debugAdornment);
		}

		let text = "Entity: " + id;
		text += "\n";

		for (const [name, component] of pairs(Components)) {
			const data = world.get(id, component);

			if (data) {
				text += name + " {";

				if (next(data)[0] !== undefined) {
					for (const [key, val] of pairs(data)) {
						text += `\n  ${key}: ${tostring(val)}`;
					}

					text += "\n";
				}
				text += "}\n";
			}
		}

		debugAdornment.label.TextLabel.Text = text;
		debugAdornment.label.TextLabel.TextTransparency = transparency;

		if (debugAdornment.highlight) {
			debugAdornment.highlight.OutlineTransparency = transparency;
		}
	}
}

export = debugVision;
