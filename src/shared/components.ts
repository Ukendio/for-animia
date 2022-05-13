import { AnyEntity, Component, component } from "@rbxts/matter";
import { Option, Vec } from "@rbxts/rust-classes";
import { TestBootstrap } from "@rbxts/testez";
import variantModule, { fields, match, payload, TypeNames, VariantCreator, VariantOf } from "@rbxts/variant";
import { EffectVariant } from "shared/effects";
import { souls_db } from "./souls_db";

/**
 * TODO:
 * Add Attack component
 * Add fn extract_ability(AbilityInput::{Primary, Secondary, Auxillary(n: number)}) {}
 */

export const Ability = component<{ name: string }>();
export type Ability = ReturnType<typeof Ability>;

export const Agency = component<{ player: Player }>();
export type Agency = ReturnType<typeof Agency>;

export const Block = component();
export type Block = ReturnType<typeof Block>;

export const CombatStats = component<{
	hp: number;
	max_hp: number;
	damage: number;
	defense: number;
	soul_power: number;
	stunned?: boolean;
}>();

export type CombatStats = ReturnType<typeof CombatStats>;

export const Counter = component<{ idx: number }>();
export type Counter = ReturnType<typeof Counter>;

export const Shape = variantModule({
	Box: fields<{}>(),
	Radius: fields(),
	Cylinder: fields(),
	Sphere: fields(),
	Disc: fields(),
	Custom: (part: BasePart) => part,
});

export type Shape<T extends TypeNames<typeof Shape> = undefined> = VariantOf<typeof Shape, T>;

export const Collision = component<{
	shape: Shape;
	blacklist: Array<Instance>;
	size: Vector3;
	collided?: boolean;
}>();
export type Collision = ReturnType<typeof Collision>;

export const DamageArea = component();
export type DamageArea = ReturnType<typeof DamageArea>;

export const Effect = component<{
	creator: Option<Player>;
	variant: EffectVariant;
	target: Option<Model>;
	pos: Option<Vector3>;
}>();
export type Effect = ReturnType<typeof Effect>;

export const Equipped = component();
export type Equipped = ReturnType<typeof Equipped>;

export const Float = component<{ cached?: boolean; force: Vector3 }>();
export type Float = ReturnType<typeof Float>;

export const HitScan = component<{ raycast_result: RaycastResult }>();
export type HitScan = ReturnType<typeof HitScan>;

export const KnockBack = component<{ force: number }>();
export type KnockBack = ReturnType<typeof KnockBack>;

export const ImpactEffect = component<{ effects: Array<ReturnType<typeof Effect>> }>();
export type ImpactEffect = ReturnType<typeof ImpactEffect>;

export const InBackpack = component<{ owner: AnyEntity; slot: Enum.KeyCode }>();
export type InBackpack = ReturnType<typeof InBackpack>;

export const Item = component();
export type Item = ReturnType<typeof Item>;

export const Lifetime = component<{ remaining_time: number }>();
export type LifeTime = ReturnType<typeof Lifetime>;

export const Mass = component<{ density: number; friction: number; elasticity: number }>();
export type Mass = ReturnType<typeof Mass>;

export const Mastery = component<{ lvl: number; exp: number }>();
export type Mastery = ReturnType<typeof Mastery>;

export const Mob = component();
export type Mob = ReturnType<typeof Mob>;

export const PerkVariant = variantModule({
	LonelyWarrior: {},
	Clone: fields<{ cloned_id: AnyEntity }>(),
});

export type PerkVariant<T extends TypeNames<typeof PerkVariant> = undefined> = VariantOf<typeof PerkVariant, T>;

export const Perk = component<{ variant: PerkVariant }>();
export type Perk = ReturnType<typeof Perk>;

export const Projectile = component<{ goal: Vector3 }>();
export type Projectile = ReturnType<typeof Projectile>;

export const Prompt = component<{ prompt: ProximityPrompt }>();
export type Prompt = ReturnType<typeof Prompt>;

export const Renderable = component<{ model: Model; in_anim?: boolean }>();
export type Renderable = ReturnType<typeof Renderable>;

export const Replicate = component<{ should_predict?: boolean }>();
export type Replicate = ReturnType<typeof Replicate>;

export const Rotation = component<{ angle: CFrame }>();
export type Rotation = ReturnType<typeof Rotation>;

export const ShadowClone = component();
export type ShadowClone = ReturnType<typeof ShadowClone>;

export const Soul = component<{ name: keyof typeof souls_db }>();
export type Soul = ReturnType<typeof Soul>;

export const StatusEffect = component<{
	effect: EffectVariant;
	duration: number;
}>();

export type StatusEffect = ReturnType<typeof StatusEffect>;

export const Steer = component<{ cached?: boolean; direction: Vector3 }>();
export type Steer = ReturnType<typeof Steer>;

export const Strafing = component<{ direction: Enum.KeyCode }>();
export type Strafing = ReturnType<typeof Strafing>;

export const SufferDamage = component<{ damage: number; src: Option<Player> }>();
export type SufferDamage = ReturnType<typeof SufferDamage>;

export const Target = component();
export type Target = ReturnType<typeof Target>;

export const Team = component<{ players: Vec<AnyEntity> }>();
export type Team = ReturnType<typeof Team>;

export const Tracker = component<{ target: Instance }>();
export type Tracker = ReturnType<typeof Tracker>;

export const Transform = component<{
	cf: CFrame;

	do_not_reconcile?: boolean;
}>();
export type Transform = ReturnType<typeof Transform>;

export const TweenProps = component<{ data: TweenInfo }>();
export type TweenProps = ReturnType<typeof TweenProps>;

export const UseAbility = component<{ key_code: Enum.KeyCode }>();
export type UseAbility = ReturnType<typeof UseAbility>;

export const Velocity = component<{ speed: number }>();
export type Velocity = ReturnType<typeof Velocity>;

export const WantsMelee = component();
export type WantsMelee = ReturnType<typeof WantsMelee>;

export const WantsOpenInventory = component();
export type WantsOpenInventory = ReturnType<typeof WantsOpenInventory>;

export const WantsPickUp = component<{ item: AnyEntity; collected_by: AnyEntity }>();
export type WantsPickUp = ReturnType<typeof WantsPickUp>;

// make a new component for Player with a field for health
// also make a type for it
