import { useThrottle, World } from "@rbxts/matter";
import { Lighting, Workspace } from "@rbxts/services";
import { CombatStats, Renderable, Soul } from "shared/components";

export function sunlight_hurts_vampires(world: World): void {
	for (const [, soul, { model }, combat_stats] of world.query(Soul, Renderable, CombatStats)) {
		if (soul.name === "Vampire") {
			if (useThrottle(0.5)) {
				const sun_direction = Lighting.GetSunDirection();

				const raycast_result = Workspace.Raycast(model.GetPivot().Position, sun_direction.mul(300));
				if (raycast_result && raycast_result.Instance) continue;

				model.FindFirstChildOfClass("Humanoid")?.TakeDamage(5 - combat_stats.damage);
			}
		}
	}
}
