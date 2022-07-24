import { useEvent, World } from "@rbxts/matter";
import { Widgets } from "@rbxts/plasma";
import { Players, UserInputService, Workspace } from "@rbxts/services";
import { ClientState } from "client/game.client";
import { Collision, ImpactEffect, Lifetime, Projectile, Renderable, Transform, Velocity } from "shared/components";

const player = Players.LocalPlayer;
const mouse = player.GetMouse();

function shootProjectiles(world: World, state: ClientState, ui: Widgets): void {
	for (const [, { KeyCode }, gameProcessedEvent] of useEvent(UserInputService, "InputBegan")) {
		if (gameProcessedEvent) continue;

		if (KeyCode === Enum.KeyCode.F) {
			const part = new Instance("Part");
			part.Anchored = true;
			part.CanCollide = false;

			const model = new Instance("Model");
			model.Parent = Workspace;
			model.PrimaryPart = part;

			const cf = new CFrame(state.character.GetPivot().Position, mouse.Hit.Position);
			part.CFrame = cf;

			part.Parent = model;

			world.spawn(
				Projectile({ direction: mouse.Hit.Position.sub(cf.Position).Unit, filter: [player.Character!] }),
				Renderable({ model }),
				Transform({ cf }),
				Velocity({ speed: 50 }),
				Collision({ size: model.PrimaryPart.Size }),
				Lifetime({ spawnedAt: os.clock(), length: 5 }),
			);
		}
	}
}

export = {
	event: "fixed",
	system: shootProjectiles,
};
