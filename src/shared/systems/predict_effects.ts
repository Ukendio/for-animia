import { AnyEntity, Entity, InferComponents, World } from "@rbxts/matter";
import { ComponentCtor, DynamicBundle } from "@rbxts/matter/src/lib/Component";
import { CombatStats, Effect, Replicate } from "shared/components";
import { replicate_fx_on_client } from "shared/effects/replicate_fx_on_client";

function system(world: World): void {
	for (const [id, effect] of world.query(Effect).without(Replicate)) {
		const player_id = effect.creator.unwrap().GetAttribute("entity_id") as AnyEntity;

		const combat_stats = world.get(player_id, CombatStats);

		if (combat_stats && combat_stats) continue;

		replicate_fx_on_client(world, effect);

		world.insert(id, Replicate());
	}
}

type Last<T extends Array<unknown>> = T extends [...infer F, infer L] ? L : never;

type QueryOf<a extends DynamicBundle> = [
	...a,
	((e: Entity<InferComponents<a>>, ...components: InferComponents<a>) => Map<never, never>)?,
];

declare function useSync<a extends DynamicBundle, T extends QueryOf<a>>(
	...components: T
): Last<T> extends ComponentCtor ? IterableFunction<LuaTuple<[Entity<InferComponents<a>>, InferComponents<a>]>> : void;

for (const [e, combat] of useSync(CombatStats)) {
}

useSync(CombatStats, (e, c) => {
	return new Map();
});

export const predict_effects = {
	priority: 100,
	system,
};
