import { Loop, World } from "@rbxts/matter";
import { RunService } from "@rbxts/services";
import { players_have_agency } from "./systems/players_have_agency";
import { remove_missing_models } from "shared/systems/remove_missing_models";
import { spawn_mobs } from "./systems/spawn_mobs";
import update_transforms from "shared/systems/update_transforms";
import { frictionless_grapplers } from "./systems/frictionless_grapplers";
import { apply_mass } from "./systems/apply_mass";
import { ice_arrows } from "./systems/souls/gray/ice_arrows";
import tracker_moves from "./systems/tracker_moves";
import { remove_missing_trackers } from "./systems/remove_missing_trackers";

const world = new World();
const loop = new Loop(world);

loop.scheduleSystems([
	players_have_agency,
	remove_missing_models,
	remove_missing_trackers,
	update_transforms,
	spawn_mobs,
	frictionless_grapplers,
	apply_mass,
	ice_arrows,
	tracker_moves,
]);

loop.begin({ default: RunService.Heartbeat });
