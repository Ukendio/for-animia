import { AnyEntity, useEvent, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { match } from "@rbxts/variant";
import { Effect } from "shared/components";

import { remotes } from "shared/remotes";

const create_fx = remotes.Server.Get("create_fx");
const replicate_fx = remotes.Server.Get("replicate_fx");

export function replicate_effects(world: World): void {
	for (const [, plr, effect] of useEvent("create_fx", create_fx)) {
		match(effect.variant, {
			Damage: () => {
				world.spawn(
					Effect({
						creator: Option.some(plr),
						variant,
						target: Option.wrap(target),
						pos: Option.wrap(pos),
					}),
				);
			},
			default: () => replicate_fx.SendToAllPlayersExcept(plr, effect),
		});

		const { variant, target, pos } = effect;
	}
}
