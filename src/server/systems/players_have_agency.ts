import { useEvent, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Agency, Renderable, Soul } from "shared/components";

export function players_have_agency(world: World): void {
	Players.GetPlayers().forEach((player) => {
		for (const [_, character] of useEvent(player, "CharacterAdded")) {
			const id = world.spawn(Agency(player), Renderable({ model: character }), Soul({ name: "Deku" }));

			player.SetAttribute("entity_id", id);
		}

		for (const [id] of world.query(Agency).without(Renderable)) {
			world.despawn(id);
		}
	});
}
