export function iFrame(duration: number, source: Player): void {
	const character = source.Character;

	if (!character) return;

	const humanoid = character.FindFirstChildOfClass("Humanoid");

	if (!humanoid) return;

	for (const v of character.GetDescendants()) {
		if (v.IsA("BasePart") && v !== character.PrimaryPart) {
			v.CanQuery = false;

			v.Transparency = 1;
		} else if (v.IsA("Decal")) {
			v.Transparency = 1;
		}
	}

	humanoid.WalkSpeed = 48;

	task.delay(duration, () => {
		for (const v of character.GetDescendants()) {
			if (v.IsA("BasePart") && v !== character.PrimaryPart) {
				v.CanQuery = true;

				v.Transparency = 0;
			} else if (v.IsA("Decal")) {
				v.Transparency = 0;
			}
		}
		humanoid.WalkSpeed = 16;
	});
}
