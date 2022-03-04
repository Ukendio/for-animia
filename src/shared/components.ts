import { AnyEntity, component, } from "@rbxts/matter";

export const Ability = component<{ name: string }>();

export const Archer = component();

export const Arrow = component<{ goal: Vector3 }>();

export const CombatStats = component<{ hp: number; max_hp: number; damage: number }>();

export const Counter = component<{ idx: number }>();

export const Deku = component("Deku")

export const Equipped = component();

export const Grappler = component("Gray");

export const Grappling = component<{ remaining_time: number; goal: Vector3; hooked?: boolean }>();

export const Gray = component("Gray");

export const Float = component<{ cached?: boolean; force: Vector3 }>();

export const HasColoured = component();

export const HitScan = component<{ raycast_result: RaycastResult }>();

export const InBackpack = component<{ owner: AnyEntity; slot: number }>();

export const Item = component();

export const MacroKeyBind = component<{ macro: [Enum.KeyCode, Enum.KeyCode] }>();

export const Mass = component<{ density: number; friction: number; elasticity: number }>();

export const Mob = component<{ id: number }>();

export const OnHitEffect = component<{ id: string }>();

export const Projectile = component<{ origin?: CFrame; goal: CFrame; remaining_time?: number; caster_model?: Model }>();

export const Prompt = component<{ prompt: ProximityPrompt }>();

export const Punch = component()

export const Range = component<{ size: number }>();

export const Renderable = component<{ model: Model }>();

export const Rotation = component<{ angle: CFrame }>();

export const Spinning = component();

export const Steer = component<{ cached?: boolean; direction: Vector3 }>();

export const Strafing = component<{ direction: Enum.KeyCode }>();

export const Target = component();

export const Tracker = component<{ target: Instance }>();

export const Transform = component<{ cf: CFrame; do_not_reconcile?: boolean }>();

export const TweenProps = component<{ data: TweenInfo }>();

export const WantsMelee = component<{ damage: number; remaining_time?: number }>();

export const WantsOpenInventory = component();

export const WantsPickUp = component<{ item: AnyEntity; collected_by: AnyEntity }>();

export const Windup = component<{ remaining_time: number; finished?: boolean }>();
