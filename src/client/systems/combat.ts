import { log, useThrottle, World } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { UserInputService, Workspace } from "@rbxts/services";
import { match } from "@rbxts/variant";
import { ClientState } from "shared/clientState";
import { Melee } from "shared/components";

let stackAttack = 0;
const resetAttackThreshold = 4;

const animationPool = [11622802115, 11622804603, 11622805548, 11622806762, 11622807792, 11622809030, 11622809776];

const anim = new Instance("Animation");

function attack(character: CharacterRigR15, world: World): void {
	character.Humanoid.Animator.GetPlayingAnimationTracks().forEach((a) => a.Stop());
	anim.AnimationId = `rbxassetid://${animationPool[stackAttack]}`;
}

function combat(world: World, client: ClientState): void {
	if (!client.lastProcessedCommand) return;

	if (useThrottle(0.15)) {
		const character = client.character;

		const shouldEscape = match(client.lastProcessedCommand, {
			Hold: ({ duration }) => {
				// charged attack
				if (duration > 0.5) {
					// aerial
					if (client.character.Humanoid.FloorMaterial === undefined) {
						const origin = character.HumanoidRootPart.Position;
						const floor = Workspace.Raycast(origin, origin.add(new Vector3(0, 5)));

						if (floor) return;
					}
					stackAttack = animationPool.size() - 1;
					attack(character, world);

					return false;
				}
				return true;
			},
			PointerClick: () => {
				stackAttack = 0;
				attack(character, world);

				return false;
			},
			DoubleClick: () => {
				stackAttack += 1;
				print(stackAttack);

				if (stackAttack > resetAttackThreshold) {
					stackAttack = 0;
				}

				attack(character, world);
				return false;
			},
			KeyDown: ({ key }) => {
				if (key === Enum.KeyCode.Q) {
					print("skill");
				} else if (key === Enum.KeyCode.E) {
					print("burst");
				}
			},
			default: () => {
				return true;
			},
		});

		if (shouldEscape) return;
		client.character.Humanoid.Animator.LoadAnimation(anim).Play();
	}
}

export = {
	system: combat,
	event: "default",
};
