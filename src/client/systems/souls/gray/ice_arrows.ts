import { useEvent, World } from "@rbxts/matter";
import { Players, ReplicatedStorage, UserInputService, Workspace } from "@rbxts/services";
import { todo } from "@rbxts/todo";
import { Controls } from "client/main.client";
import { Projectile, Renderable, Soul, Tracker, Transform, TweenProps } from "shared/components";
import { remotes } from "shared/remotes";

const replicate_fx = remotes.replicate_fx;

export function ice_arrows(world: World, state: Controls): void {
	for (const [, soul, { model }] of world.query(Soul, Renderable)) {
		if (soul.name === "Gray") {
			for (const [, { KeyCode }] of useEvent(UserInputService, "InputBegan")) {
				if (KeyCode === state.use_ability_1) {
					const mouse_hit = Players.GetPlayerFromCharacter(model)!.GetMouse().Hit;
					todo();
				}
			}
		}
	}

	for (const [, child] of useEvent(Workspace.Effects, "ChildAdded")) {
		if (child.Name === "IceArrows" + "_server") {
			const ice = ReplicatedStorage.Assets.Particles.Ice.Ice.Clone();
			ice.BrickColor = BrickColor.Blue();
			ice.Attachment.Trail.Enabled = false;

			const ice_model = new Instance("Model");

			ice.Parent = ice_model;
			ice_model.PrimaryPart = ice;

			ice.Transparency = 1;

			const target = (child as Model).PrimaryPart as Part;

			if (target) {
				world.spawn(
					Transform({ cf: target.CFrame }),
					Projectile(),
					Renderable({ model: ice_model }),
					TweenProps({ data: new TweenInfo(0.0055, Enum.EasingStyle.Linear, Enum.EasingDirection.Out) }),
					Tracker({ target }),
				);
			}
		}
	}

	for (const [, variant] of useEvent(replicate_fx, "OnClientEvent")) {
		print(variant);
	}

	for (const [, ability_name, pos] of useEvent(
		new Instance("RemoteEvent"),
		new Instance("RemoteEvent").OnServerEvent as RBXScriptSignal<() => void>,
	)) {
	}
}
