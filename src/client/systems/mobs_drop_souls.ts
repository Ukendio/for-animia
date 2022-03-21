import { useEvent, World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { ReplicatedStorage, Workspace } from "@rbxts/services";
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

		for (const _ of useEvent(humanoid, "Died")) {
			suffer_damage.source
				.zip(Option.wrap(ReplicatedStorage.Assets.FindFirstChild(soul.name) as Model))
				.map(([src, soul_model]) => {
					const plr_mastery = world.get(src, Mastery);

					soul_model.Parent = Workspace;

					world.insert(src, plr_mastery.patch({ exp: plr_mastery.exp + mastery.lvl }));
					world.spawn(soul, Item(), Renderable({ model: soul_model }));

					world.insert(id, Lifetime({ remaining_time: 3 }));
				});
		}
	}
}
