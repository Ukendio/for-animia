<<<<<<< HEAD
import { PhysicsService, ReplicatedStorage } from "@rbxts/services";

const physicsGroupCollide = ReplicatedStorage.WaitForChild("PhysicsGroupCollide") as RemoteEvent;

export function iFrame(duration: number, player: Player): void {
	const character = player.Character;
=======
export function iFrame(duration: number, source: Player): void {
	const character = source.Character;
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a

	if (!character) return;

	const humanoid = character.FindFirstChildOfClass("Humanoid");

	if (!humanoid) return;

	for (const v of character.GetDescendants()) {
<<<<<<< HEAD
		if (v.IsA("BasePart")) {
			v.CanQuery = false;

			if (v !== character.PrimaryPart) {
				v.Transparency = 1;
			}
=======
		if (v.IsA("BasePart") && v !== character.PrimaryPart) {
			v.CanQuery = false;

			v.Transparency = 1;
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		} else if (v.IsA("Decal")) {
			v.Transparency = 1;
		}
	}

<<<<<<< HEAD
	physicsGroupCollide.FireServer("Invincible");

=======
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
	humanoid.WalkSpeed = 48;

	task.delay(duration, () => {
		for (const v of character.GetDescendants()) {
<<<<<<< HEAD
			if (v.IsA("BasePart")) {
				v.CanQuery = true;

				if (v !== character.PrimaryPart) {
					v.Transparency = 0;
				}
=======
			if (v.IsA("BasePart") && v !== character.PrimaryPart) {
				v.CanQuery = true;

				v.Transparency = 0;
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
			} else if (v.IsA("Decal")) {
				v.Transparency = 0;
			}
		}
<<<<<<< HEAD

		physicsGroupCollide.FireServer("Agency");
=======
>>>>>>> 88d084f2bdeb776ac73f69a0f1481b4cfe8c8b1a
		humanoid.WalkSpeed = 16;
	});
}
