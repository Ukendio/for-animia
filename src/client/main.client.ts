import { Loop, World } from "@rbxts/matter";
import { RunService } from "@rbxts/services";

import { remove_missing_models } from "shared/systems/remove_missing_models";
import update_transforms from "shared/systems/update_transforms";

import spawn_player from "./systems/spawn_player";
import { ice_arrows } from "./systems/souls/gray/ice_arrows";
import { track_world } from "./systems/track_world";
import projectiles_follow_trackers from "./systems/projectiles_follow_trackers";

export interface ClientData {
	jump: Enum.KeyCode;
	strafe_left: Enum.KeyCode;
	strafe_right: Enum.KeyCode;
	m1: Enum.UserInputType;
	interact: Enum.KeyCode;
	toggle_menu: Enum.KeyCode;
	equip_weapon_1: Enum.KeyCode;
	equip_weapon_2: Enum.KeyCode;
	equip_weapon_3: Enum.KeyCode;
	use_ability_1: Enum.KeyCode;
	use_ability_2: Enum.KeyCode;
	use_ability_3: Enum.KeyCode;
	use_ability_4: Enum.KeyCode;
}

const world = new World();

const state = identity<ClientData>({
	jump: Enum.KeyCode.Space,
	strafe_left: Enum.KeyCode.A,
	strafe_right: Enum.KeyCode.D,
	m1: Enum.UserInputType.MouseButton1,
	interact: Enum.KeyCode.E,
	toggle_menu: Enum.KeyCode.G,
	equip_weapon_1: Enum.KeyCode.One,
	equip_weapon_2: Enum.KeyCode.Two,
	equip_weapon_3: Enum.KeyCode.Three,
	use_ability_1: Enum.KeyCode.C,
	use_ability_2: Enum.KeyCode.Q,
	use_ability_3: Enum.KeyCode.E,
	use_ability_4: Enum.KeyCode.X,
});

const loop = new Loop(world, state);

loop.scheduleSystems([
	remove_missing_models,
	update_transforms,
	spawn_player,
	ice_arrows,
	track_world,
	projectiles_follow_trackers,
]);

loop.begin({ default: RunService.Heartbeat });
