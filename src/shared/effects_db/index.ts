import { Children, New } from "@rbxts/fusion";
import { AnyEntity } from "@rbxts/matter";
import { Option, Vec } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";

export const enum EffectType {
	Damage,
	Explosion,
	KnockBack,
}

export interface EffectTypeInfo {
	[EffectType.Damage]: { damage: number };
	[EffectType.Explosion]: { size: NumberSequence };
	[EffectType.KnockBack]: { force: Vector3 };
}

export interface Emit {
	once: (...emit_counts: Array<number>) => Model;
}

export type SerializedEffect = {
	[E in EffectType]: {
		creator: AnyEntity | undefined;
		effect_type: E;
		effect_payload: EffectTypeInfo[E];
		target: AnyEntity | undefined;
		pos: Vector3 | undefined;
	};
}[EffectType];

export type DeserializedEffect = {
	[E in EffectType]: {
		creator: Option<AnyEntity>;
		effect_type: E;
		effect_payload: EffectTypeInfo[E];
		target: Option<AnyEntity>;
		pos: Option<Vector3>;
	};
}[EffectType];

export function emit_effects(particles: Vec<ParticleEmitter>, effects_model: Model): Emit {
	return {
		once: (...emit_counts: Array<number>): Model => {
			emit_counts.forEach((emit_count, idx) => particles.get(idx).map((particle) => particle.Emit(emit_count)));
			return effects_model;
		},
	};
}

export function create_orig(position: Vector3): (particles: Vec<ParticleEmitter>) => Model {
	return function (particles: Vec<ParticleEmitter>): Model {
		const part = New("Part")({
			Size: Vector3.one,
			Position: position,
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

export function compose_effects(pos: Vector3, effects: Vec<ParticleEmitter>): Emit {
	const orig = create_orig(pos);
	const effects_model = orig(effects);
	return emit_effects(effects, effects_model);
}
