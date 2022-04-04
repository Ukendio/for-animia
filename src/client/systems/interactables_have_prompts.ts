import { World } from "@rbxts/matter";
import { Controls } from "client/main.client";
import { Item, Renderable, Prompt } from "shared/components";

export function InteractablesHavePrompt(world: World, state: Controls): void {
	for (const [id, , { model }] of world.query(Item, Renderable).without(Prompt)) {
		const prompt = new Instance("ProximityPrompt");
		prompt.Parent = model;
		prompt.KeyboardKeyCode = state.interact;

		world.insert(id, Prompt({ prompt }));
	}
}
