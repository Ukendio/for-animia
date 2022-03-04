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
	use_ability_1: Enum.KeyCode;
	use_ability_2: Enum.KeyCode;
	use_ability_3: Enum.KeyCode;
	use_ability_4: Enum.KeyCode;
	dash: [Enum.KeyCode, Enum.KeyCode]
}

const world = new World();

const key = <T extends keyof typeof Enum.KeyCode>(key: T): typeof Enum.KeyCode[T] => Enum.KeyCode[key]

const input_type =<T extends keyof typeof Enum.UserInputType>(key: T): typeof Enum.UserInputType[T] => Enum.UserInputType[key]

const state = identity<ClientData>({
	jump: key("Space"),
	strafe_left: key("A"),
	strafe_right: key("D"),
	m1: input_type("MouseButton1"),
	interact: key("E"),
	toggle_menu: key("G"),
	use_ability_1: key("One"),
	use_ability_2: key("Two"),
	use_ability_3: key("Three"),
	use_ability_4: key("Four"),
	dash: [key("Q"), key("E")]
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
