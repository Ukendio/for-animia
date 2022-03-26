import { World } from "@rbxts/matter";
import { Effect, Replicate } from "shared/components";
import remotes from "shared/remotes";

const create_fx = remotes.Client.WaitFor("CreateFX2");
const replicate_fx = remotes.Client.WaitFor("ReplicateFX2");

export function replicate_effects(world: World): void {
	for (const [, effect, { should_predict }] of world.query(Effect, Replicate)) {
		const { creator, effect_type, effect_payload, target, pos } = effect;

		create_fx
			.andThen((rpc) => {
				rpc.SendToServer({
					creator,
					effect_type,
					effect_payload,
				});
			})
			.catch(() => {
				print("In Hoarcekat session");
			});
	}
}
