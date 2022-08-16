import { component, Entity } from "@rbxts/matter";
import { EffectPayload } from "./effects";

export const Agent = component<{ action?: string; targetPosition?: Vector3; residentOf: Entity<[Zone]> }>("Mob");
export type Agent = ReturnType<typeof Agent>;

export const Charge = component<{ charge: number }>("Charge");
export type Charge = ReturnType<typeof Charge>;

export const Client = component<{
	player: Player;
	lineSight: Vector3;
	document: {
		rewardsMultiplier: number;
		bonusMultiplier?: number;
	};
}>("Client");
export type Client = ReturnType<typeof Client>;

export const Collision = component<{ size: Vector3 }>("Collision");
export type Collision = ReturnType<typeof Collision>;

export const CombatStats = component<{
	hp: number;
	maxHp: number;
	damage: number;
}>("CombatStats");
export type CombatStats = ReturnType<typeof CombatStats>;

export const DebugAdornment = component<{
	label: BillboardGui & { TextLabel: TextLabel };
	highlight: Highlight;
	lineBox: ScreenGui & { topLeft: Frame; topRight: Frame; bottomLeft: Frame; bottomRight: Frame };
	lineSight: Part;
}>("DebugAdornment");
export type DebugAdornment = ReturnType<typeof DebugAdornment>;

export const Effect = component<EffectPayload>("Effect");
export type Effect = ReturnType<typeof Effect>;

export const ImpactEffect = component<{ effects: Array<Effect> }>("ImpactEffect");
export type ImpactEffect = ReturnType<typeof ImpactEffect>;

export const Lifetime = component<{ spawnedAt: number; length: number; elapsed: number }>("Lifetime");
export type Lifetime = ReturnType<typeof Lifetime>;

export const Projectile = component<{ direction: Vector3; filter: Array<Instance> }>("Projectile");
export type Projectile = ReturnType<typeof Projectile>;

export const Renderable = component<{ model: Model }>("Renderable");
export type Renderable = ReturnType<typeof Renderable>;

export const SplashDamage = component<{ radius: number; damage: number }>("SplashDamage");
export type SplashDamage = ReturnType<typeof SplashDamage>;

export const Transform = component<{ cf: CFrame; doNotReconcile?: boolean }>("Transform");
export type Transform = ReturnType<typeof Transform>;

export const Velocity = component<{ speed: number }>("Velocity");
export type Velocity = ReturnType<typeof Velocity>;

export const Zone = component<{ maxCapacity: number; population: number }>("Zone");
export type Zone = ReturnType<typeof Zone>;
