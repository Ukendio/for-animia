import { Vec } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";
import { MODULE_DECLARATION } from "./mod";
import tween from "./tween";

const rng = new Random();

const anim = new Instance("Animation");
anim.AnimationId = "rbxassetid://7738674443";

const module = script as MODULE_DECLARATION;

export function flare(origin: CFrame, targets: Vec<BasePart>): Promise<Array<void>> {
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
