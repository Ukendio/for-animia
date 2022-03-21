import { World } from "@rbxts/matter";
import { Mastery, Soul, Target } from "shared/components";
import { souls_db } from "shared/souls_db";

export function souls_evolve(world: World): void {
	for (const [id, soul, mastery] of world.query(Soul, Mastery, Target)) {
		const exp_needed = souls_db[soul.name].evolutions.get(mastery.lvl + 1).match(
			(n) => n,
			() => 0,
		);

		if (exp_needed <= mastery.exp) continue;
		else world.insert(id, mastery.patch({ lvl: mastery.lvl + 1, exp: exp_needed - mastery.exp }));
	}
}
