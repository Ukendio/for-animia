import { World } from "@rbxts/matter";
import { Effect, Replicate } from "shared/components";
import remotes from "shared/remotes";

const create_fx = remotes.Client.WaitFor("CreateFX");
const replicate_fx = remotes.Client.WaitFor("ReplicateFX");

export function replicate_effects(world: World): void {
	for (const [, effect, { should_predict }] of world.query(Effect, Replicate)) {
		const { creator, variant, target, pos } = effect;

		create_fx
			.andThen((rpc) => {
				rpc.SendToServer({
					creator: creator.asPtr(),
					variant,
					target: target.asPtr(),
					pos: pos.asPtr(),
				});
			})
			.catch(() => {
				print("In Hoarcekat session");
			});
	}
}
