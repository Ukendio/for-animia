import { Janitor } from "@rbxts/janitor";
import { Vec } from "@rbxts/rust-classes";
import { RunService, Workspace } from "@rbxts/services";
import tween from "./tween";

const head_janitor = new Janitor();
const rng = new Random();
const module = script as MODULE_DECLARATION;

function rotate_tween<T extends BasePart>(object: T, rotation: number, time: number, style: Enum.EasingStyle): void {
	const value = new Instance("NumberValue");
	const tween_seq = tween(value, { Value: rotation }, time, style);
	tween_seq.Play();

	const janitor = head_janitor.Add(new Janitor());

	let changed = 0;
	janitor.Add(
		RunService.RenderStepped.Connect(() => {
			object.CFrame = object.CFrame.mul(CFrame.Angles(0, math.rad(value.Value - changed), 0));
			changed = value.Value;
		}),
	);

	janitor.Add(
		tween_seq.Completed.Connect(() => {
			janitor.Destroy();
		}),
	);
}
const anim = new Instance("Animation");
anim.AnimationId = "rbxassetid://7738674443";

interface MODULE_DECLARATION extends LuaSourceContainer {
	flip_book: Folder;
	prefab: Model & {
		HitFlares: Part & {
			Attachment: Attachment & {
				Spark1: ParticleEmitter;
				Spark2: ParticleEmitter;
			};
		};
		Slash: Part & {
			Mesh: SpecialMesh;
			Decal: Decal;
		};
		Sphere: Part & {
			Mesh: SpecialMesh;
		};
	};
	overlay_model: Model & {
		MeshPart: MeshPart;
	};
}

function play_flip_book(decal: Decal, folder: Folder): Promise<void> {
	return new Promise<void>((resolve) => {
		for (const page of folder.GetChildren()) {
			decal.Texture = (page as Decal).Texture;
			task.wait();
		}
		resolve();
	});
}

function flare(origin: CFrame, targets: Vec<BasePart>) {
	if (targets.first().isNone()) return;

	return Promise.all([
		new Promise<void>((resolve) => {
			for (let i = 0; i < 5; i++) {
				task.spawn(() => {
					const spark = module.prefab.Sphere.Clone();
					spark.Color = Color3.fromRGB(126, 255, 145);
					spark.Size = new Vector3(0.1, rng.NextInteger(20, 30) / 100, rng.NextInteger(20, 30) / 100);
					spark.CFrame = origin.mul(
						CFrame.Angles(0, math.rad(rng.NextInteger(-20, 20)), math.rad(rng.NextInteger(-20, 20))),
					);
					spark.Parent = Workspace;
					tween(
						spark,
						{ CFrame: spark.CFrame.mul(new CFrame(rng.NextInteger(-40, -80) / 10, 0, 0)) },
						0.3,
					).Play();
					tween(
						spark,
						{ Size: new Vector3(rng.NextNumber(2, 3), spark.Size.Y, spark.Size.Z) },
						0.1,
						Enum.EasingStyle.Quart,
					).Play();

					return Promise.delay(0.1)
						.then(() => {
							tween(
								spark,
								{ Size: new Vector3(spark.Size.X / 4, 0, 0), Transparency: 1 },
								0.1,
								Enum.EasingStyle.Quad,
							).Play();
						})
						.andThenCall(Promise.delay, 0.1)
						.then(() => {
							tween(
								spark,
								{ Size: new Vector3(spark.Size.X / 4, 0, 0), Transparency: 1 },
								0.1,
								Enum.EasingStyle.Quad,
							).Play();
							spark.Destroy();
							resolve();
						});
				});
			}
		}),
		new Promise<void>((resolve) => {
			const slice = module.prefab.Sphere.Clone();
			slice.Color = Color3.fromRGB(126, 255, 145);
			slice.CFrame = origin.mul(
				CFrame.Angles(0, math.rad(rng.NextInteger(-20, 20)), math.rad(rng.NextInteger(-20, 20))),
			);
			slice.Parent = Workspace;
			tween(slice, { Size: new Vector3(6, 0, 0), CFrame: slice.CFrame.mul(new CFrame(1, 0, 0)) }, 0.3).Play();
			return Promise.delay(0.2).then(() => {
				tween(slice, { Transparency: 1 }, 0.1).Play();

				Promise.delay(0.15).then(() => {
					slice.Destroy();
					resolve();
				});
			});
		}),
		new Promise<void>((resolve) => {
			const hit_flares = module.prefab.HitFlares.Clone();
			hit_flares.CFrame = origin;
			hit_flares.Parent = Workspace;
			hit_flares.Attachment.Spark1.Emit();
			hit_flares.Attachment.Spark2.Emit();

			return Promise.delay(0.5).then(() => {
				hit_flares.Destroy();
				resolve();
			});
		}),
		new Promise<void>((resolve) => {
			targets.iter().forEach((root) => {
				const character = root.Parent as Model;
				const anim_player = character.FindFirstChild("Humanoid")?.FindFirstChild("Animator") as Animator;

				const track = anim_player.LoadAnimation(anim);
				const target_cframe = (character.FindFirstChild("HumanoidRootPart") as BasePart).CFrame;

				const overlay_model = module.overlay_model.Clone();
				overlay_model.MeshPart.Color = Color3.fromRGB(126, 255, 145);
				overlay_model.MeshPart.Material = Enum.Material.Neon;
				overlay_model.MeshPart.Size = overlay_model.MeshPart.Size.add(new Vector3(0.1, 0.1, 0.1));

				overlay_model.SetPrimaryPartCFrame(target_cframe);
				overlay_model.Parent = Workspace;

				track.Play();
				tween(
					overlay_model.MeshPart,
					{
						Transparency: 1,
						Size: (overlay_model.MeshPart.Size = overlay_model.MeshPart.Size.add(
							new Vector3(0.5, 0.5, 0.5),
						)),
					},
					0.3,
					Enum.EasingStyle.Quad,
				).Play();

				Promise.delay(0.35).then(() => {
					overlay_model.Destroy();
					track.Stop();
					resolve();
				});
			});
		}),
	]);
}

export = (animator: Animator, origin: CFrame, targets: Array<BasePart>) => {
	print(targets);
	//origin: HumanoidRootPartCFrame
	const slash = module.prefab.Slash.Clone();
	slash.CFrame = origin.mul(CFrame.Angles(0, math.rad(90), 0));
	slash.Parent = Workspace;

	rotate_tween(slash, -190, 0.3, Enum.EasingStyle.Quad);
	task.defer(() => {
		task.wait(0.1);
		flare(
			origin.mul(CFrame.Angles(0, math.rad(rng.NextInteger(-30, 30)), math.rad(rng.NextInteger(-10, -30)))),
			Vec.fromPtr(targets),
		)?.expect();
	});
	play_flip_book(slash.Decal, module.flip_book).then(() => {
		slash.Destroy();
	});
};
