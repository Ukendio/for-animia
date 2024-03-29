import { component, Entity } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { Buff } from "./buff";

export const Activated = component<{}>("Activated");
export type Activated = ReturnType<typeof Activated>;

export const Agent = component<{
	action?: string;
	targetPosition?: Vector3;
	residentOf: Entity<[Zone, Transform, Collision]>;
}>("Agent");
export type Agent = ReturnType<typeof Agent>;

export { Buff };

export const Body = component<{ model: CharacterRigR15 }>();
export type Body = ReturnType<typeof Body>;

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
	state?: "Dead";
	isDead?: boolean;
}>("CombatStats");
export type CombatStats = ReturnType<typeof CombatStats>;

export const DebugAdornment = component<{
	label: BillboardGui & { TextLabel: TextLabel };
	highlight: Highlight;
	lineBox: ScreenGui & { topLeft: Frame; topRight: Frame; bottomLeft: Frame; bottomRight: Frame };
	lineSight: Part;
}>("DebugAdornment");
export type DebugAdornment = ReturnType<typeof DebugAdornment>;

export const Interactable = component<{}>("Interactable");
export type Interactable = ReturnType<typeof Interactable>;

export const Lifetime = component<{ spawnedAt: number; length: number; elapsed: number }>("Lifetime");
export type Lifetime = ReturnType<typeof Lifetime>;

export const Melee = component<{ applied: boolean }>();
export type Melee = ReturnType<typeof Melee>;

export const Projectile = component<{ direction: Vector3; filter: Array<Instance> }>("Projectile");
export type Projectile = ReturnType<typeof Projectile>;

export const Prompt = component<{ prompt: ProximityPrompt }>("Prompt");
export type Prompt = ReturnType<typeof Prompt>;

export const Renderable = component<{ model: Model; doNotDestroy?: boolean }>("Renderable");
export type Renderable = ReturnType<typeof Renderable>;

export const SplashDamage = component<{ radius: number; damage: number }>("SplashDamage");
export type SplashDamage = ReturnType<typeof SplashDamage>;

export const Transform = component<{ cf: CFrame; doNotReconcile?: boolean }>("Transform");
export type Transform = ReturnType<typeof Transform>;

export const Velocity = component<{ speed: number }>("Velocity");
export type Velocity = ReturnType<typeof Velocity>;

export const Zone = component<{ maxCapacity: number; population: number }>("Zone");
export type Zone = ReturnType<typeof Zone>;
