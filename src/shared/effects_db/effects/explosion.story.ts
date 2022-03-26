import { Vec } from "@rbxts/rust-classes";
import { compose_effects } from "..";
import { explosion_1, explosion_2, explosion_3, explosion_4 } from "./explosions";

export = (target: Instance): Callback => {
	const effects_model = compose_effects(
		new Vector3(0, 10, 0),
		Vec.fromPtr([explosion_1(new NumberSequence(8, 10))]),
	).once(1, 1);
	return function (): void {
		effects_model.Destroy();
	};
};
