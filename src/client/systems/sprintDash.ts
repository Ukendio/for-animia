import { log, World } from "@rbxts/matter";
import { Players, RunService } from "@rbxts/services";
import { match } from "@rbxts/variant";
import { ClientState } from "shared/clientState";

const player = Players.LocalPlayer;
let shouldSprint = false;
let lastDashed = os.clock();
let direction: Vector3 | undefined = undefined;
function sprintDash(world: World, client: ClientState): void {
	if (!client.lastProcessedCommand) return;

	match(client.lastProcessedCommand, {
		KeyDown: ({ key }) => {
			if (key === Enum.KeyCode.LeftShift) {
				lastDashed = os.clock();
				const root = client.character.HumanoidRootPart;
				direction = root.CFrame.mul(root.CFrame.LookVector);
			}
		},
		default: () => {},
	});

	// should "renew sprint dash"
	log(os.clock() - lastDashed);
	if (os.clock() - lastDashed < 0.25) {
		client.character.Humanoid.WalkSpeed = 35;

		return;
	}

	client.character.Humanoid.WalkSpeed = 20;
	direction = undefined;
}

export = {
	system: sprintDash,
	event: "fixed",
};

RunService.BindToRenderStep("", Enum.RenderPriority.Character.Value + 1, () => {
	if (direction) {
		player.Move(direction);
	}
});
