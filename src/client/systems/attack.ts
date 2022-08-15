import { useThrottle, World } from "@rbxts/matter";
import { HttpService, Players, Workspace } from "@rbxts/services";
import { Effect } from "shared/components";
import { EffectVariant } from "shared/effects";
import { ClientState } from "shared/clientState";
import { match } from "@rbxts/variant";

const abilityMap = new Map<Enum.KeyCode, keyof ClientState["abilities"]>([
	[Enum.KeyCode.One, "ability1"],
	[Enum.KeyCode.Two, "ability2"],
	[Enum.KeyCode.Three, "ability3"],
	[Enum.KeyCode.Four, "ability4"],
]);

const spatialQueryParams = new OverlapParams();
spatialQueryParams.FilterType = Enum.RaycastFilterType.Blacklist;

const basicAttackCooldown = 0.125;

function attack(world: World, client: ClientState): void {
	const input = client.commandRecord.new;
	if (input) {
		match(input, {
			// basic m1 attacks
			PointerClick: () => {
				const root = client.character.FindFirstChild("HumanoidRootPart") as Part;
				if (!root) return;

				const origo = root.CFrame;

				spatialQueryParams.FilterDescendantsInstances = [client.character];

				const targets = new Set(
					Workspace.GetPartBoundsInBox(
						origo.add(root.CFrame.LookVector.mul(4)),
						new Vector3(4, 4, 4),
						spatialQueryParams,
					).mapFiltered((v) => {
						if (v.Parent?.FindFirstChild("Humanoid")) {
							return v.Parent as Model;
						}
					}),
				);

				if (useThrottle(basicAttackCooldown)) {
					for (const target of targets) {
						world.spawn(
							Effect({
								predictionGUID: HttpService.GenerateGUID(false),
								variant: EffectVariant.Damage(10),
								target: target,
								source: Players.LocalPlayer,
							}),
						);
					}
				}
			},
			// abilities
			KeyDown: ({ key }) => {
				const abilityName = abilityMap.get(key);

				if (abilityName) {
					client.abilities[abilityName].map((ability) => {
						if (useThrottle(ability.cooldown + ability.channelTime, ability.effect.variant.type)) {
							// We need a new GUID to treat so that the prediction buffer doesn't see this effect
							world.spawn(ability.effect.patch({ predictionGUID: HttpService.GenerateGUID(false) }));
						}
					});
				}
			},
			default: () => {},
		});
	}
}

export = {
	event: "fixed",
	system: attack,
};
