import { New, Children } from "@rbxts/fusion";
import { Vec } from "@rbxts/rust-classes";
import host_effect from "shared/host_effect";

export interface Emit {
	once: (...emit_counts: Array<number>) => Model;
}
export function emit_effects(particles: Vec<ParticleEmitter>, effects_model: Model): Emit {
	return {
		once: (...emit_counts: Array<number>): Model => {
			emit_counts.forEach((emit_count, idx) =>
				particles.get(idx).map((particle) => {
					particle.Emit(emit_count);
				}),
			);
			return effects_model;
		},
	};
}

export function create_orig(pos: Vector3): (particles: Vec<ParticleEmitter>) => Model {
	return function (particles: Vec<ParticleEmitter>): Model {
		const part = New("Part")({
			Size: Vector3.one,
			Transparency: 1,
			Position: pos,
			[Children]: [
				New("Attachment")({
					[Children]: particles.asPtr(),
				}),
			],
		});

		return New("Model")({
			PrimaryPart: part,
			Parent: host_effect,
			[Children]: [part],
		});
	};
}

export function compose_effects(effects: Vec<ParticleEmitter>, pos: Vector3): Emit {
	const orig = create_orig(pos);
	const effects_model = orig(effects);
	return emit_effects(effects, effects_model);
}
