import { AnyEntity, Entity, InferComponents, useEvent, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { Players, ReplicatedStorage, Workspace } from "@rbxts/services";
import { Item, Lifetime, Mastery, Mob, Renderable, Soul, SufferDamage, Target } from "shared/components";

export function mobs_drop_souls(world: World): void {
	for (const [id, { model }, soul, suffer_damage, mastery] of world.query(
		Renderable,
		Soul,
		SufferDamage,
		Mastery,
		Mob,
	)) {
		const humanoid = model.FindFirstChildOfClass("Humanoid");

		if (!humanoid) continue;

		for (const [] of useEvent(humanoid, "Died")) {
			const soul_model = ReplicatedStorage.Assets.FindFirstChild(soul.name) as Model;
			suffer_damage.src.map((plr) => {
				const src = plr.GetAttribute("entity_id") as Entity<InferComponents<[typeof Mastery]>>;
				const plr_mastery = world.get(src, Mastery);

				world.insert(src, plr_mastery.patch({ exp: plr_mastery.exp + mastery.lvl }));
			});

			soul_model.Parent = Workspace;

			world.spawn(soul, Item(), Renderable({ model: soul_model }));
			world.insert(id, Lifetime({ remaining_time: 3 }));
		}
	}
}
