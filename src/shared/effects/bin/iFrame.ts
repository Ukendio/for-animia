export function iFrame(duration: number, source: Player): void {
	const character = source.Character;

	if (!character) return;

	const humanoid = character.FindFirstChildOfClass("Humanoid");

	if (!humanoid) return;

	for (const bodyPart of character.GetDescendants()) {
		if (!bodyPart.IsA("BasePart") || bodyPart === character.PrimaryPart) continue;

		bodyPart.Transparency = 1;
		bodyPart.CanQuery = false;
	}

	humanoid.WalkSpeed = 48;

	task.delay(duration, () => {
		for (const bodyPart of character.GetDescendants()) {
			if (!bodyPart.IsA("BasePart") || bodyPart === character.PrimaryPart) continue;

			bodyPart.Transparency = 0;
			bodyPart.CanQuery = true;
		}
		humanoid.WalkSpeed = 16;
	});
}
