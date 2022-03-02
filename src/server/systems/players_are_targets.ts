import { useEvent, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Target, Renderable, Gray } from "shared/components";

export function players_are_targets(world: World): void {
	Players.GetPlayers().forEach((player) => {
		for (const [_, character] of useEvent(player, "CharacterAdded")) {
			world.spawn(Target(), Renderable({ model: character }), Gray());
		}

		for (const [id] of world.query(Target).without(Renderable)) {
			world.despawn(id);
		}
	});
}
