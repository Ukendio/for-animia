import { useEvent, World } from "@rbxts/matter";
import { ClientState } from "shared/clientState";
import { Activated, Interactable, Prompt, Renderable } from "shared/components";

function interactablesHavePrompts(world: World, client: ClientState): void {
	for (const [id] of world.query(Renderable, Interactable).without(Prompt)) {
		const prompt = new Instance("ProximityPrompt");
		prompt.KeyboardKeyCode = client.promptKeyboardKeyCode;
		world.insert(id, Prompt({ prompt }));
	}

	for (const [id] of world.query(Activated, Prompt, Interactable)) {
		world.remove(id, Activated);
	}

	for (const [id, prompt] of world.query(Prompt, Interactable).without(Activated)) {
		for (const _ of useEvent(prompt.prompt, "Triggered")) {
			world.insert(id, Activated());
		}
	}
}

export = interactablesHavePrompts;
