<<<<<<< HEAD
import { log, World } from "@rbxts/matter";
=======
import { World } from "@rbxts/matter";
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
import { match } from "@rbxts/variant";
import { Effect } from "shared/components";
import { dash } from "./bin/dash";
import { iFrame } from "./bin/iFrame";

export function replicate_fx_on_client(world: World, { source, variant, target, pos }: Effect): void {
	match(variant, {
<<<<<<< HEAD
		Dash: () => dash(source),
		Damage: () => {},
=======
		Dash: ({ direction }) => dash(direction, source),
		Damage: error,
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		InvincibilityFrame: ({ duration }) => {
			if (!source) return;

			iFrame(duration, source);
		},
	});
}
