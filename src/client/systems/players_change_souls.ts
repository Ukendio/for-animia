import { useEvent, useThrottle, World } from "@rbxts/matter";
import { HashMap } from "@rbxts/rust-classes";
import { Players, ReplicatedStorage, UserInputService } from "@rbxts/services";
import { Controls } from "client/main.client";
import { InBackpack, Mastery, Renderable, Soul, Target } from "shared/components";

const soul_mastery_cache = HashMap.empty<ReturnType<typeof Soul>, ReturnType<typeof Mastery>>();

export function players_change_souls(world: World, controls: Controls): void {
	if (useThrottle(1.5)) {
		for (const [, { KeyCode }] of useEvent(UserInputService, "InputBegan")) {
			if (
				KeyCode === controls.equip_soul_1 ||
				KeyCode === controls.equip_soul_2 ||
				KeyCode === controls.equip_soul_3
			) {
				for (const [plr_id] of world.query(Target)) {
					for (const [, backpack, item_soul] of world.query(InBackpack, Soul)) {
						if (KeyCode === backpack.slot) continue;

						const mastery = Mastery({ lvl: 0, exp: 0 });
						soul_mastery_cache.entry(item_soul).orInsert(mastery);

						world.insert(plr_id, item_soul);
					}
				}
			}
		}
	}
	for (const [id, soul_record, { model }, mastery] of world.queryChanged(Soul, Renderable, Mastery, Target)) {
		if (soul_record.new && soul_record.new !== soul_record.old) {
			const player = Players.GetPlayerFromCharacter(model);
			if (!player) continue;

			const soul_model = ReplicatedStorage.Assets.FindFirstChild(soul_record.new.name) as Model;
			if (!soul_model) continue;

			player.Character = soul_model;

			soul_mastery_cache.insert(soul_record.new, mastery);

			world.insert(id, soul_mastery_cache.i(soul_record.new));
		}
	}
}
