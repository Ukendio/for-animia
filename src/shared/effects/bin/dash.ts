import LightningBolt from "@rbxts/lightning-beams";
import { Workspace } from "@rbxts/services";
import { dust } from "./dust";
import { LightningSparks } from "./lightningSparks";

const RANGE = 12;

export function dash(source: Player): void {
	const character = source.Character;
	if (!character) return;

	const root = character.FindFirstChild("HumanoidRootPart") as Part;
	const humanoid = character.FindFirstChild("Humanoid") as Humanoid;

	if (!root || !humanoid) return;

	const raycastParams = new RaycastParams();
	raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;
	raycastParams.FilterDescendantsInstances = [root.Parent!];

	const attachment0 = new Instance("Attachment");
	attachment0.Parent = Workspace.Terrain;

	const attachment1 = new Instance("Attachment");
	attachment1.Parent = Workspace.Terrain;

	const desiredDirection = (
		humanoid.MoveDirection.Magnitude > 0 ? humanoid.MoveDirection : root.CFrame.LookVector
	).mul(12);

	const raycastResult = Workspace.Raycast(root.Position, root.CFrame.LookVector.mul(12), raycastParams);

	let cf = root.CFrame.add(desiredDirection);

	if (raycastResult) {
		cf = CFrame.lookAt(raycastResult.Position, raycastResult.Position.add(root.CFrame.LookVector));
	}

	attachment0.CFrame = root.CFrame;
	attachment1.CFrame = cf;
	root.PivotTo(cf);

	const bolt = new LightningBolt(attachment0, attachment1, 22);
	[bolt.CurveSize0, bolt.CurveSize1] = [0, 0];
	bolt.ContractFrom = 0.1;
	bolt.Thickness = 1.2;
	bolt.PulseSpeed = 30;
	bolt.PulseLength = 0.1;
	bolt.FadeLength = 1;
	bolt.PulseLength = 5;

	const result = Workspace.Raycast(attachment1.WorldPosition, new Vector3(0, -8, 0));

	if (result && result.Instance) {
		const raycastParams = new RaycastParams();
		raycastParams.FilterType = Enum.RaycastFilterType.Blacklist;
		raycastParams.FilterDescendantsInstances = [root.Parent!];

		const attachment = new Instance("Attachment");
		attachment.Parent = root;

		task.delay(0.5, () => attachment.Destroy());

		const dashFx = dust();
		dashFx.Parent = attachment;
		dashFx.Emit(15);
	}

	task.spawn(() => {
		for (const i of $range(3, 1, -0.1)) {
			task.wait(1 / 30);
			bolt.MaxRadius = i;
		}
	});

	bolt.Color = new ColorSequence([
		new ColorSequenceKeypoint(0, new Color3(0.27451, 0.929412, 1)),
		new ColorSequenceKeypoint(1, new Color3(1, 1, 1)),
	]);

	const sparks = new LightningSparks(bolt, 11);
	sparks.minSpeed = 3;
	sparks.maxSpeed = 5;
	[sparks.minDistance, sparks.maxDistance] = [5, 5];
}
