import { New, Children } from "@rbxts/fusion";
import { Vec } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";

export interface Emit {
	once: (...emit_counts: Array<number>) => Model;
}
export function emit_effects(particles: Vec<ParticleEmitter>, effects_model: Model): Emit {
	return {
		once: (...emit_counts: Array<number>): Model => {
			emit_counts.forEach((emit_count, idx) => particles.get(idx).map((particle) => particle.Emit(emit_count)));
			return effects_model;
		},
	};
}

export function create_orig(): (particles: Vec<ParticleEmitter>) => Model {
	return function (particles: Vec<ParticleEmitter>): Model {
		const part = New("Part")({
			Size: Vector3.one,

			Position: new Vector3(0, -9999, 0),
			Transparency: 1,
			[Children]: [
				New("Attachment")({
					[Children]: particles.asPtr(),
				}),
			],
		});

		return New("Model")({
			PrimaryPart: part,
			[Children]: [part],
			Parent: Workspace,
		});
	};
}

export function compose_effects(effects: Vec<ParticleEmitter>): Emit {
	const orig = create_orig();
	const effects_model = orig(effects);
	return emit_effects(effects, effects_model);
}

// print 1 to 5
function count(): void {
	print(1);
	print(2);
	print(3);
}
