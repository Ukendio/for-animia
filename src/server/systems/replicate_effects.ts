import { useEvent, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { match } from "@rbxts/variant";
import { Effect } from "shared/components";

import { remotes } from "shared/remotes";

const create_fx = remotes.Server.Create("create_fx");
const replicate_fx = remotes.Server.Create("replicate_fx");

export function replicate(world: World): void {
	for (const [, plr, effect] of useEvent("create_fx", create_fx)) {
		match(effect.variant, {
			Damage: () => {
				world.spawn(
					Effect({
						creator: Option.wrap(creator),
						variant,
						target: Option.wrap(target),
						pos: Option.wrap(pos),
					}),
				);
			},
			default: () => replicate_fx.SendToAllPlayersExcept(plr, effect),
		});

		const { creator, variant, target, pos } = effect;
	}
}
