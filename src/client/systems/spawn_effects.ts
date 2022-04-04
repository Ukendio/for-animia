import { useEvent, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { Effect, Replicate } from "shared/components";
import { replicate_fx_on_client } from "shared/effects_db/replicate_fx_on_client";
import { remotes } from "shared/remotes";

const create_fx = remotes.Client.Get("create_fx");
const replicate_fx = remotes.Client.Get("replicate_fx");

export function spawn_effects(world: World): void {
	for (const [, { creator, variant, target, pos }] of world.query(Effect, Replicate)) {
		create_fx.SendToServer({
			creator: creator.asPtr(),
			variant,
			target: target.asPtr(),
			pos: pos.asPtr(),
		});
	}

	for (const [, { creator, target, variant, pos }] of useEvent("replicate_fx", replicate_fx)) {
		replicate_fx_on_client(world, {
			creator: Option.wrap(creator),
			target: Option.wrap(target),
			variant,
			pos: Option.wrap(pos),
		});
	}
}
