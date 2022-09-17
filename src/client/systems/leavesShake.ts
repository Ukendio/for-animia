import { World } from "@rbxts/matter";
import { Option } from "@rbxts/rust-classes";
import { Lighting } from "@rbxts/services";
import WindShake from "@rbxts/wind-shake";
import WindLines from "client/windLines";

WindShake.Init();
WindLines.Init({ Direction: new Vector3(10, 0, 0.3), Speed: 10, Lifetime: 3, SpawnRate: 11 });
Lighting.ClockTime = 12;

function leavesShake(world: World): void {}

Option.none();
export = leavesShake;
