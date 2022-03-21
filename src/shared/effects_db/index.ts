import { Children, New } from "@rbxts/fusion";
import { AnyEntity } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";
import { Effect } from "../components";

export const enum EffectType {
	Damage,
	KnockBack,
}

export interface EffectTypeInfo {
	[EffectType.Damage]: { damage: number };
	[EffectType.KnockBack]: { force: Vector3 };
}

export function map_effect_payload<T extends EffectType>(
	creator: Option<AnyEntity>,
	effect_type: T,
	effect_payload: EffectTypeInfo[T],
): ReturnType<typeof Effect> {
	return Effect({ creator, effect_type, effect_payload, target: Option.none() });
}

export interface Emit {
	once: (...emit_counts: Array<number>) => Model;
}

export function emit_effects(particles: Array<ParticleEmitter>, effects_model: Model): Emit {
	return {
		once: (...emit_counts: Array<number>): Model => {
			emit_counts.forEach((emit_count, idx) => particles[idx].Emit(emit_count));
			return effects_model;
		},
	};
}

export function create_orig(position: Vector3): (particles: Array<ParticleEmitter>) => Model {
	return function (particles: Array<ParticleEmitter>): Model {
		const part = New("Part")({
			Size: Vector3.one,
			Position: position,
			Transparency: 1,
			[Children]: [
				New("Attachment")({
					[Children]: particles,
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

export function compose_effects(pos: Vector3, effects: Array<ParticleEmitter>): Emit {
	const orig = create_orig(pos);
	const effects_model = orig(effects);
	return emit_effects(effects, effects_model);
}
