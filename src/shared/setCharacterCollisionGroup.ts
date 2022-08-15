import { PhysicsService } from "@rbxts/services";

export function setPartCollisionGroup(character: Model, groupName: "Agency" | "Invincible"): void {
	for (const v of character.GetDescendants()) {
		if (v.IsA("BasePart")) {
			PhysicsService.SetPartCollisionGroup(v, groupName);
		}
	}
}
