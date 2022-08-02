import { Children, New, Ref, Value } from "@rbxts/fusion";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { TweenService, Workspace } from "@rbxts/services";
import { getAnimationLength } from "shared/getAnimationLength";

function createAttachment(
	props: Partial<WritableInstanceProperties<Attachment>>,
	host: Instance,
	debugMode: DebugMode,
): Attachment {
	return New("Attachment")({
		...props,
		Parent: host,
		Visible: debugMode === DebugMode.TrailAdornments ? true : false,
	});
}

function debugAdornments(attachments: Array<Attachment>, debugMode: DebugMode): void {
	for (const attachment of attachments) {
		const adornment = new Instance("BillboardGui");
		adornment.AlwaysOnTop = true;
		adornment.Enabled = debugMode === DebugMode.TrailAdornments ? true : false;
		adornment.Size = new UDim2(1, 0, 1, 0);

		const textLabel = new Instance("TextLabel");
		textLabel.Text = attachment.Name;
		textLabel.Parent = adornment;
		textLabel.Size = UDim2.fromScale(1, 1);
		textLabel.BackgroundTransparency = 1;
		textLabel.BorderColor3 = Color3.fromRGB(27, 42, 53);
		textLabel.BorderSizePixel = 1;
		textLabel.TextStrokeTransparency = 1;
		textLabel.TextColor3 = BrickColor.random().Color;
		textLabel.TextSize = 15;
		textLabel.TextXAlignment = Enum.TextXAlignment.Left;
		textLabel.TextYAlignment = Enum.TextYAlignment.Top;
		textLabel.Parent = adornment;

		adornment.Parent = attachment;
	}
}

const SPEED = 0.05;
const TWEEN_INFO = new TweenInfo(SPEED, Enum.EasingStyle.Linear, Enum.EasingDirection.In);

enum DebugMode {
	TrailOnly,
	TrailAdornments,
	Nothing,
}
function splineNode(
	name: string,
	cf: CFrame,
	wayPoints: { [index: number]: Partial<WritableInstanceProperties<Attachment>> },
	host: Instance,
	debugMode: DebugMode,
): void {
	const splinePart = new Instance("Part");
	splinePart.Anchored = true;
	splinePart.CanCollide = false;
	splinePart.CanTouch = false;
	splinePart.CastShadow = false;
	splinePart.CanQuery = false;
	splinePart.Name = `Spline@${name}`;
	splinePart.Size = new Vector3(30, 25, 13.375);
	splinePart.CFrame = cf;
	splinePart.Transparency = 1;
	splinePart.Parent = host;

	let start = Vector3.one;

	for (const [i, props] of pairs(wayPoints)) {
		const attachment = createAttachment({ Name: tostring(i), ...props }, host, debugMode);
		if (i === 1) {
			start = attachment.WorldPosition;
		}

		attachment.Parent = splinePart;
	}

	const trailPart = new Instance("Part");
	trailPart.Anchored = true;
	trailPart.CanCollide = false;
	trailPart.CanTouch = false;
	trailPart.CanQuery = false;
	trailPart.Size = Vector3.one;
	trailPart.Position = start;
	trailPart.Transparency = 1;
	trailPart.Parent = host;

	const trail = new Instance("Trail");
	trail.FaceCamera = true;
	trail.Attachment0 = createAttachment(
		{ Name: "0", Position: new Vector3(trailPart.Size.X / 2, 0, 0) },
		trailPart,
		debugMode,
	);
	trail.Attachment1 = createAttachment(
		{ Name: "1", Position: new Vector3(-(trailPart.Size.X / 2), 0, 0) },
		trailPart,
		debugMode,
	);
	trail.Texture = "rbxassetid://10405228862";
	trail.Color = new ColorSequence(Color3.fromRGB(5, 133, 117));
	trail.LightEmission = 0;
	trail.LightInfluence = 1;
	trail.Lifetime = 1.5;
	trail.Transparency = new NumberSequence(debugMode === DebugMode.Nothing ? 1 : 0);
	trail.Parent = trailPart;

	task.defer(() => {
		const sortedAttachments = splinePart
			.GetChildren()
			.sort((a, b) => tonumber(a.Name)! < tonumber(b.Name)!) as Array<Attachment>;
		debugAdornments(sortedAttachments, debugMode);

		for (const attachment of sortedAttachments) {
			const tween = TweenService.Create(trailPart, TWEEN_INFO, {
				Position: attachment.WorldPosition,
				Orientation: attachment.WorldOrientation,
			});
			tween.Play();
			tween.Completed.Wait();
		}
	});
}

const deathAnimation = new Instance("Animation");
deathAnimation.AnimationId = "rbxassetid://10407034618";

const deathAnimationLen = getAnimationLength(deathAnimation);

export function death(target: CharacterRigR15): Part {
	target.HumanoidRootPart.Anchored = true;
	const humanoid = target.Humanoid;
	const animator = humanoid.Animator;

	if (animator) {
		for (const anim of animator.GetPlayingAnimationTracks()) {
			anim.Stop();
		}
		const animationTrack = animator.LoadAnimation(deathAnimation);
		animationTrack.Play();

		task.delay(deathAnimationLen - 0.05, () => {
			animationTrack.AdjustSpeed(0);
		});
	}
	const temp = new Instance("Part");
	temp.Anchored = true;
	temp.CanCollide = false;
	temp.CanTouch = false;
	temp.CanQuery = false;
	temp.CastShadow = false;
	temp.Transparency = 1;
	temp.BrickColor = BrickColor.Red();
	temp.Size = new Vector3(30, 25, 13.375);

	task.delay(0.05, () => {
		const cf = target.GetPivot().sub(target.HumanoidRootPart.CFrame.LookVector.mul(-2).add(new Vector3(0, -10, 0)));

		temp.CFrame = cf;
		temp.Parent = Workspace.Terrain;

		task.delay(0.5, () => {
			splineNode(
				"a",
				cf,
				{
					[1]: { Position: new Vector3(-10, 10, -5) },
					[2]: { Position: new Vector3(-9.75, 8, -4.75) },
					[3]: { Position: new Vector3(-9.5, 6, -4.5) },
					[4]: { Position: new Vector3(-8, 4, -5) },
					[5]: { Position: new Vector3(-7, 1, -5) },
					[6]: { Position: new Vector3(-6, -2, -4) },
					[7]: { Position: new Vector3(-5, -4, -3) },
					[8]: { Position: new Vector3(-4, -6, -2) },
					[9]: { Position: new Vector3(-2, -8, -1) },
					[10]: { Position: new Vector3(0, -10, 0), Rotation: new Vector3(0, 0, 90) },
					[11]: { Position: new Vector3(3.2, -11, 1), Rotation: new Vector3(0, 0, 80) },
					[12]: { Position: new Vector3(3.6, -11, 2), Rotation: new Vector3(0, 0, 60) },
					[13]: { Position: new Vector3(2, -8, 3.5), Rotation: new Vector3(-15, 30, 0) },
					[14]: { Position: new Vector3(-1, -8, 3.5) },
				},
				temp,
				DebugMode.TrailOnly,
			);

			splineNode(
				"b",
				cf,
				{
					[1]: { Position: new Vector3(10, 10, -3) },
					[2]: { Position: new Vector3(9.5, 7.5, -2) },
					[3]: { Position: new Vector3(9.1, 5, -1.5) },
					[4]: { Position: new Vector3(8.7, 2.5, -1.25) },
					[5]: { Position: new Vector3(8.3, 0, -1) },
					[6]: { Position: new Vector3(7.9, -2.5, -0.5) },
					[7]: { Position: new Vector3(7.5, -5, 0.25) },
					[8]: { Position: new Vector3(6.6, -7.5, 1) },
					[9]: { Position: new Vector3(5.6, -9, 2.25) },
					[10]: { Position: new Vector3(3.5, -11, 2.5) },
					[11]: { Position: new Vector3(1, -11.5, 2.5) },
					[12]: { Position: new Vector3(-3, -12, 2) },
					[13]: { Position: new Vector3(-2.5, -11, 0) },
					[14]: { Position: new Vector3(1.5, -9, 0) },
					[15]: { Position: new Vector3(2, -8, 2) },
					[16]: { Position: new Vector3(1, -8, 3.5) },
					[17]: { Position: new Vector3(0, -8.25, 1.5) },
				},
				temp,
				DebugMode.TrailOnly,
			);

			task.delay(1.5, () => {
				const outline = Value<ParticleEmitter>(undefined!);
				const smoke = Value<ParticleEmitter>(undefined!);

				const orig = New("Attachment")({
					CFrame: target.GetPivot(),
					Parent: Workspace.Terrain,
					[Children]: {
						smoke: New("ParticleEmitter")({
							Enabled: false,
							Color: new ColorSequence([
								new ColorSequenceKeypoint(0, Color3.fromRGB(10, 74, 54)),
								new ColorSequenceKeypoint(1, Color3.fromRGB(18, 97, 71)),
							]),
							Lifetime: new NumberRange(0.65, 0.85),
							Rate: 40,
							RotSpeed: new NumberRange(-180, 180),
							Rotation: new NumberRange(-360, 360),
							ShapeStyle: Enum.ParticleEmitterShapeStyle.Surface,
							Size: new NumberSequence([
								new NumberSequenceKeypoint(0, 1.35, 0),
								new NumberSequenceKeypoint(1, 0.8, 2.7),
							]),
							Speed: new NumberRange(7.5, 15),
							SpreadAngle: new Vector2(-360, 360),
							Texture: "rbxassetid://8120749500",
							Transparency: new NumberSequence([
								new NumberSequenceKeypoint(0, 0.8130000000000001, 0),
								new NumberSequenceKeypoint(0.5, 0.82, 0),
								new NumberSequenceKeypoint(1, 1, 0),
							]),
							ZOffset: -2,
							[Ref]: smoke,
						}),

						outline: New("ParticleEmitter")({
							Enabled: false,
							Color: new ColorSequence([
								new ColorSequenceKeypoint(0, Color3.fromRGB(8, 69, 41)),
								new ColorSequenceKeypoint(1, Color3.fromRGB(0, 59, 46)),
							]),
							Lifetime: new NumberRange(0.35000000000000003, 0.75),
							Rate: 50,
							Rotation: new NumberRange(-360, 360),
							Size: new NumberSequence([
								new NumberSequenceKeypoint(0, 2.5, 0),
								new NumberSequenceKeypoint(1, 6.406, 8.594),
							]),
							Speed: new NumberRange(0, 0),
							Texture: "rbxassetid://8133065785",
							Transparency: new NumberSequence([
								new NumberSequenceKeypoint(0, 0.34400000000000003, 0),
								new NumberSequenceKeypoint(1, 1, 0),
							]),
							ZOffset: -1,
							[Ref]: outline,
						}),
					},
				});

				smoke.get().Emit();
				outline.get().Emit();

				const highlight = new Instance("Highlight");
				highlight.FillColor = Color3.fromRGB(0, 95, 68);
				highlight.FillTransparency = 0.15;
				highlight.OutlineTransparency = 0;
				highlight.OutlineColor = Color3.fromRGB(0, 100, 93);
				highlight.Parent = target;

				task.delay(2.5, () => {
					orig.Destroy();
				});
			});

			task.delay(1.5, () => {
				splineNode(
					"c",
					cf,
					{
						[1]: { Position: new Vector3(0, -13, 1) },
						[2]: { Position: new Vector3(-0.5, -12.5, 0) },
						[3]: { Position: new Vector3(-1.5, -12, 0.5) },
						[4]: { Position: new Vector3(-1.75, -11, 1.75) },
						[5]: { Position: new Vector3(-1, -10.5, 3) },
						[6]: { Position: new Vector3(1, -10, 2.7) },
						[7]: { Position: new Vector3(1.5, -10, 1.5) },
						[8]: { Position: new Vector3(0, -10.5, 0.5) },
						[9]: { Position: new Vector3(-2, -10, 1) },
						[10]: { Position: new Vector3(-3, -9, 2.5) },
						[11]: { Position: new Vector3(-2, -8.5, 4.5) },
						[12]: { Position: new Vector3(1, -8.5, 3) },
						[13]: { Position: new Vector3(1.5, -10, 1) },
						[14]: { Position: new Vector3(0, -10, 1) },
						[15]: { Position: new Vector3(0, -9, 1.5) },
					},
					temp,
					DebugMode.TrailOnly,
				);
			});
		});
	});

	return temp;
}
