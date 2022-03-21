import { useThrottle, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Renderable, Target } from "shared/components";

export function cash_rewards(world: World): void {
	for (const [, { model }] of world.query(Renderable, Target)) {
		if (useThrottle(60)) {
			const player = Players.GetPlayerFromCharacter(model)!;
			print(`give cash to ${player.Name}`);
		}
	}
}
