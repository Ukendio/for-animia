import { useDeltaTime, useEvent, useThrottle, World } from "@rbxts/matter";
import { Players, TweenService, UserInputService, Workspace } from "@rbxts/services";
import { ClientData } from "client/main.client";
import { Float, Grappler, Grappling, HitScan, Range, Renderable, Steer, Target, Windup } from "shared/components";
import { get_mass_of_model } from "shared/get_mass_of_model";

const raycast_params = new RaycastParams();
raycast_params.FilterType = Enum.RaycastFilterType.Blacklist;

const range = 300;
const shoot_speed = 1000;
const hook_force = 2000;
const hook_boost_force = 3250;
const twist_force = 1500;

const hook_attach = new Instance("Attachment");
hook_attach.Name = "Hook";

const line_force = new Instance("LineForce");
line_force.Name = "LineForce";
line_force.Parent = hook_attach;

export function grapplers_hooks(world: World, state: ClientData): void {
	for (const [grappler_entity, { model }] of world.query(Renderable, Grappler, Target).without(Windup, HitScan)) {
		if (!hook_attach.Parent?.IsDescendantOf(game)) {
			hook_attach.Parent = model.FindFirstChild("RightHand");
			hook_attach.Position = new Vector3(0.5, 0, 0);
		}

		for (const [, { KeyCode }] of useEvent(UserInputService, "InputBegan")) {
			if (KeyCode === state.use_ability_3) {
				const root = model.FindFirstChild("HumanoidRootPart") as Part;

				if (!root) continue;

				raycast_params.FilterDescendantsInstances = [model];

				const raycast_result = Workspace.Raycast(
					root.Position,
					Players.GetPlayerFromCharacter(model)!.GetMouse().Hit.Position.sub(root.Position).mul(range),
					raycast_params,
				);

				if (raycast_result) {
					const remaining_time = raycast_result.Position.sub(root.Position).Magnitude / shoot_speed;

					world.insert(
						grappler_entity,
						HitScan({ raycast_result }),
						Windup({
							remaining_time,
						}),
					);
				}
			}
		}
	}

	for (let [grappler_entity, windup, hit_scan, { model }] of world.query(Windup, HitScan, Renderable, Grappler)) {
		windup = windup.patch({ remaining_time: windup.remaining_time - useDeltaTime() });

		if (windup.remaining_time <= 0) {
			print("huh");
			world.insert(
				grappler_entity,
				Float({ force: new Vector3(0, get_mass_of_model(model) * Workspace.Gravity, 0) }),
				Steer({ direction: hit_scan.raycast_result.Position }),
			);

			world.remove(grappler_entity, Windup);

			// spawn hook
		} else world.insert(grappler_entity, windup);
	}

	for (let [grappler_entity, { model }, float, steer, hit_scan] of world
		.query(Renderable, Float, Steer, HitScan, Grappler)
		.without(Windup)) {
		const root = model.FindFirstChild("HumanoidRootPart") as Part;

		if (!root) continue;

		if (UserInputService.IsKeyDown(state.strafe_left)) {
			const force = root.CFrame.mul(new CFrame(-1, 0, 0)).Position.sub(root.Position).Unit.mul(twist_force);
			float = float.patch({ force: new Vector3(force.X, float.force.Y, force.Z) });
		} else if (UserInputService.IsKeyDown(state.strafe_right)) {
			const force = root.CFrame.mul(new CFrame(1, 0, 0)).Position.sub(root.Position).Unit.mul(twist_force);
			float = float.patch({ force: new Vector3(force.X, float.force.Y, force.Z) });
		} else if (!UserInputService.IsKeyDown(state.strafe_left) && !UserInputService.IsKeyDown(state.strafe_right)) {
			float = float.patch({ force: new Vector3(0, get_mass_of_model(model) * Workspace.Gravity, 0) });
		}

		world.insert(grappler_entity, float, steer.patch({ direction: hit_scan.raycast_result.Position }));

		const camera = Workspace.CurrentCamera;

		if (!camera) continue;
		TweenService.Create(camera, new TweenInfo(0.5), { FieldOfView: 100 }).Play();
	}

	for (let [grappler_entity, { model }] of world.query(Renderable, Float, Steer, Grappler, HitScan)) {
		for (const [, { KeyCode }] of useEvent(UserInputService, "InputBegan")) {
			if (KeyCode === state.jump) {
				line_force.Magnitude = hook_force;

				const humanoid = model.FindFirstChild("Humanoid") as Humanoid;

				if (!humanoid) continue;

				TweenService.Create(humanoid, new TweenInfo(0.4), {
					CameraOffset: new Vector3(humanoid.CameraOffset.X, humanoid.CameraOffset.Y, 10),
				}).Play();
			}
		}
		for (const [, { KeyCode }] of useEvent(UserInputService, "InputEnded")) {
			const humanoid = model.FindFirstChild("Humanoid") as Humanoid;

			if (!humanoid) continue;

			if (KeyCode === state.use_ability_3) {
				const camera = Workspace.CurrentCamera;

				if (!camera) continue;
				TweenService.Create(camera, new TweenInfo(1), { FieldOfView: 70 }).Play();

				TweenService.Create(humanoid, new TweenInfo(0.4), { CameraOffset: Vector3.zero }).Play();
				world.remove(grappler_entity, Float, Steer);
			} else if (KeyCode === state.jump) {
				print("jump end");
				TweenService.Create(humanoid, new TweenInfo(0.4), { CameraOffset: Vector3.zero }).Play();
			}
		}
	}
}
