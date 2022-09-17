import { AnyEntity, component } from "@rbxts/matter";
import { fields, variantModule, VariantOf } from "@rbxts/variant";
import { TypeNames } from "@rbxts/variant/out/types";
import { BuffKind } from "./components/buff";
import { Group } from "./components/group";

export const DamageContributor = variantModule({
	Solo: (uid: AnyEntity) => ({ uid }),
	Group: fields<{ entityId: AnyEntity; group: Group }>(),
});

export type DamageContributor<T extends TypeNames<typeof DamageContributor> = undefined> = VariantOf<
	typeof DamageContributor,
	T
>;

export const DamageSource = variantModule({
	Buff: (kind: BuffKind) => ({ kind }),
	Melee: {},
	Projectile: {},
	Explosion: {},
	Falling: {},
	Shockwave: {},
	Other: {},
});

export type DamageSource<T extends TypeNames<typeof DamageSource> = undefined> = VariantOf<typeof DamageSource, T>;

export enum DamageKind {
	Piercing,
	Slashing,
	Crushing,
	// catch all
	Energy,
}
export const Damage = component<{
	source: DamageSource;
	kind: DamageKind;
	value: number;
}>("Damage");
export type Damage = ReturnType<typeof Damage>;
