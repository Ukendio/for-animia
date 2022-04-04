import { AnyEntity, Component, component } from "@rbxts/matter";
import { Option, Vec } from "@rbxts/rust-classes";
import { EffectVariant } from "./effects_db";
import { souls_db } from "./souls_db";

export const Ability = component<{ name: string }>();

export const CombatStats = component<{
	hp: number;
	max_hp: number;
	damage: number;
	defense: number;
	soul_power: number;
}>();

export const Counter = component<{ idx: number }>();

export const Collision = component<{
	blacklist: Array<Instance>;
	size: Vector3;
	collided?: boolean;
}>();

export enum Shape {
	Box,
	Radius,
	Cylinder,
	Sphere,
	Disc,
	Custom,
}

export const DamageArea = component<{ shape: Shape }>();

export const Effect = component<{
	creator: Option<AnyEntity>;
	variant: EffectVariant;
	target: Option<AnyEntity>;
	pos: Option<Vector3>;
}>();

export const Equipped = component();

export const Float = component<{ cached?: boolean; force: Vector3 }>();

export const HitScan = component<{ raycast_result: RaycastResult }>();

export const KnockBack = component<{ force: number }>();

export const ImpactEffect = component<{ effects: Array<ReturnType<typeof Effect>> }>();

export const InBackpack = component<{ owner: AnyEntity; slot: Enum.KeyCode }>();

export const Item = component();

export const Lifetime = component<{ remaining_time: number }>();

export const Mass = component<{ density: number; friction: number; elasticity: number }>();

export const Mastery = component<{ lvl: number; exp: number }>();

export const Mob = component();

export const Projectile = component<{
	goal: Vector3;
}>();

export const Prompt = component<{ prompt: ProximityPrompt }>();

export const Renderable = component<{ model: Model; in_anim?: boolean }>();

export const Replicate = component<{ should_predict?: boolean }>();

export const Rotation = component<{ angle: CFrame }>();

export const Soul = component<{ name: keyof typeof souls_db }>();

export const Steer = component<{ cached?: boolean; direction: Vector3 }>();

export const Strafing = component<{ direction: Enum.KeyCode }>();

export const SufferDamage = component<{ damage: number; source: Option<AnyEntity> }>();

export const Target = component();

export const Team = component<{ players: Vec<AnyEntity> }>();

export const Tracker = component<{ target: Instance }>();

export const Transform = component<{ cf: CFrame; do_not_reconcile?: boolean }>();

export const TweenProps = component<{ data: TweenInfo }>();

export const Velocity = component<{ speed: number }>();

export const WantsMelee = component();

export const WantsOpenInventory = component();

export const WantsPickUp = component<{ item: AnyEntity; collected_by: AnyEntity }>();
