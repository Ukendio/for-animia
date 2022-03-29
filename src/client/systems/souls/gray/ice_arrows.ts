import { useEvent, World } from "@rbxts/matter";
import { Players, ReplicatedStorage, UserInputService, Workspace } from "@rbxts/services";
import { ClientData } from "client/main.client";
import { Projectile, Renderable, Soul, Tracker, Transform, TweenProps } from "shared/components";
import { ice_hit } from "shared/effects_db/effects/ice_hit";
import remotes from "shared/remotes";

const create_fx = remotes.Client.Get("CreateFX2");
const replicate_fx = remotes.Client.Get("ReplicateFX2");
type ReplicateFx = RBXScriptSignal<Parameters<typeof replicate_fx.Connect>[0]>;

export function ice_arrows(world: World, state: ClientData): void {
	for (const [, soul, { model }] of world.query(Soul, Renderable)) {
		if (soul.name === "Gray") {
			for (const [, { KeyCode }] of useEvent(UserInputService, "InputBegan")) {
				if (KeyCode === state.use_ability_1) {
					const mouse_hit = Players.GetPlayerFromCharacter(model)!.GetMouse().Hit;
					create_fx.SendToServer("IceArrows", mouse_hit.Position);
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

	for (const [, ability_name, pos] of useEvent(replicate_fx as never, replicate_fx as ReplicateFx)) {
		if (ability_name === "IceHit") {
			ice_hit(pos);
		}
	}
}
