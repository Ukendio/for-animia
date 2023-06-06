import { useEvent, useThrottle, World } from "@rbxts/matter";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { UserInputService, Workspace } from "@rbxts/services";
import { match } from "@rbxts/variant";
import { ClientState } from "shared/clientState";

function combat(): Callback {
	let stackAttack = 0;
	const resetAttackThreshold = 4;

	const animationPool = [11622802115, 11622804603, 11622805548, 11622806762, 11622807792, 11622809030, 11622809776];

	const anim = new Instance("Animation");

	function attack(character: CharacterRigR15, world: World): void {
		character.Humanoid.Animator.GetPlayingAnimationTracks().forEach((a) => a.Stop());
		anim.AnimationId = `rbxassetid://${animationPool[stackAttack]}`;
	}
	return function (world: World, client: ClientState): void {
		if (!client.lastProcessedCommand) return;

		const character = client.character;

		let shouldEscape = match(client.lastProcessedCommand, {
			KeyDown: ({ key }) => {
				if (key === Enum.KeyCode.Q) {
					world.spawn();
					print("skill");
				} else if (key === Enum.KeyCode.E) {
					print("burst");
				}
				return false;
			},
			default: () => true,
		});

		if (useThrottle(0.167)) {
			match(client.lastProcessedCommand, {
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

				default: () => {
					return true;
				},
			});
		}
		if (shouldEscape) return;
		client.character.Humanoid.Animator.LoadAnimation(anim).Play();
	};
}

const system = combat();
export = {
	system,
	event: "default",
};
