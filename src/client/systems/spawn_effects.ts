import { useEvent, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { Effect, Replicate } from "shared/components";
import { replicate_fx_on_client } from "shared/effects/replicate_fx_on_client";
import { remotes } from "shared/remotes";

const create_fx = remotes.Client.Get("create_fx");
const replicate_fx = remotes.Client.Get("replicate_fx");

export function spawn_effects(world: World): void {
	for (const [id, { variant, target, pos }] of world.query(Effect, Replicate)) {
		create_fx.SendToServer({
			variant,
			target: target.asPtr(),
			pos: pos.asPtr(),
		});

		print("sending effect to server", id, variant.type);
		world.despawn(id);
		// send this id to the server, and use it to know whether it was invalid?
		// potentially do: [_, effect_id] of useEvent("rollback_effect")
	}

	for (const [, { target, variant, pos, creator }] of useEvent("replicate_fx", replicate_fx)) {
		replicate_fx_on_client(world, {
			creator: Option.wrap(creator),
			target: Option.wrap(target),
			variant,
			pos: Option.wrap(pos),
		});
	}
}
