import { log, World } from "@rbxts/matter";
import { UserInputService, Workspace } from "@rbxts/services";
import { match } from "@rbxts/variant";
import { ClientState } from "shared/clientState";

let stackAttack = 0;
const resetAttackThreshold = 4;

const animationPool = [9722271, 8123412];

function basicAttack(options?: { charge?: number }): void {
	if (UserInputService.TouchEnabled) return;

	stackAttack = 0;

	log(stackAttack);
}

function combat(world: World, client: ClientState): void {
	if (client.lastProcessedCommand) {
		match(client.lastProcessedCommand, {
			HoldRelease: ({ duration }) => {
				// aerial
				if (client.character.Humanoid.FloorMaterial === undefined) {
					const origin = client.character.HumanoidRootPart.Position;
					const floor = Workspace.Raycast(origin, origin.add(new Vector3(0, 5)));
					if (!floor) return;
				}
				// charged attack
				else if (duration > 0.5) {
					basicAttack({ charge: 10 });
				} // normal attack
				else {
					basicAttack({});
				}
			},
			PointerClick: () => basicAttack(),
			DoubleClick: () => {
				stackAttack += 1;

				if (stackAttack > resetAttackThreshold) {
					stackAttack = 0;
				}

				log(stackAttack);
			},
			default: () => {},
		});
	}
}

export = { system: combat, event: "default" };
