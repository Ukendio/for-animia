import { World } from "@rbxts/matter";
import { match } from "@rbxts/variant";
import { Effect } from "shared/components";
import { dash } from "./bin/dash";
import { iFrame } from "./bin/iFrame";

export function replicate_fx_on_client(world: World, { source, variant, target, pos }: Effect): void {
	match(variant, {
		Dash: ({ direction }) => dash(direction, source),
		Damage: () => {},
		InvincibilityFrame: ({ duration }) => {
			if (!source) return;

			iFrame(duration, source);
		},
	});
}
