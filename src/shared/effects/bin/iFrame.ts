import { PhysicsService, ReplicatedStorage } from "@rbxts/services";

const physicsGroupCollide = ReplicatedStorage.WaitForChild("PhysicsGroupCollide") as RemoteEvent;

export function iFrame(duration: number, player: Player): void {
	const character = player.Character;

	if (!character) return;

	const humanoid = character.FindFirstChildOfClass("Humanoid");

	if (!humanoid) return;

	for (const v of character.GetDescendants()) {
		if (v.IsA("BasePart")) {
			v.CanQuery = false;

			if (v !== character.PrimaryPart) {
				v.Transparency = 1;
			}
		} else if (v.IsA("Decal")) {
			v.Transparency = 1;
		}
	}

	physicsGroupCollide.FireServer("Invincible");

	humanoid.WalkSpeed = 48;

	task.delay(duration, () => {
		for (const v of character.GetDescendants()) {
			if (v.IsA("BasePart")) {
				v.CanQuery = true;

				if (v !== character.PrimaryPart) {
					v.Transparency = 0;
				}
			} else if (v.IsA("Decal")) {
				v.Transparency = 0;
			}
		}

		physicsGroupCollide.FireServer("Agency");
		humanoid.WalkSpeed = 16;
	});
}
