import {  useEvent, useThrottle, World } from "@rbxts/matter";
import { UserInputService, } from "@rbxts/services";
import { ClientData } from "client/main.client";
import { Target, Renderable, CombatStats,  Punch } from "shared/components";


export function players_throw_punches(world: World, state: ClientData): void {
	if (useThrottle(3)) {
		for (const [id, , renderable, combat_stats] of world.query(Target, Renderable, CombatStats)) {
			for (const [_, { UserInputType }] of useEvent(UserInputService, "InputBegan")) {
				if (UserInputType === state.m1) {
					world.insert(id, Punch())	
				}
			}
		}
	}
}
