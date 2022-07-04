import Plasma from "@rbxts/plasma";
import { Players, Workspace } from "@rbxts/services";
import { Charge, CombatStats, Renderable, Target } from "shared/components";
import { start } from "shared/start";
import { receiveReplication } from "./receiveReplication";

export interface ClientState {
	debugEnabled: boolean;
	character: Model;
	lastInput?: Enum.KeyCode;
}

const player = Players.LocalPlayer;

const state: ClientState = {
	debugEnabled: true,
	character: player.Character || player.CharacterAdded.Wait()[0],
	lastInput: undefined,
};

declare const script: { systems: Folder };
declare const workspace: Workspace & { Lambo: Model };

const world = start(script.systems, state);

receiveReplication(world);

world.spawn(Renderable({ model: workspace.Lambo }), Charge({ charge: 100 }));

task.delay(5, () =>
	world.spawn(Renderable({ model: state.character }), CombatStats({ hp: 100, maxHp: 100, damage: 1000 }), Target()),
);
