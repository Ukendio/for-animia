import { Dependency } from "@flamework/core";
import { ThisFabricUnit, UnitDefinition } from "@rbxts/fabric";
import Log from "@rbxts/log";
import { Vec } from "@rbxts/rust-classes";
import { Players, Workspace } from "@rbxts/services";
import { EffectEmitter } from "client/systems/EffectEmitter";
import { ToolChain } from "client/systems/ToolChain";
import { MeleeTransmitData } from "shared/Types";

interface Melee extends UnitDefinition<"Melee"> {
	ref?: BasePart;
	units: {
		Replicated: {};
	};

	defaults?: {
		targets: Array<BasePart>;
		origin: CFrame;
		damage: number;
		effect_name: string;
		effect?: Callback;
	};

	onClientMelee?: (this: ThisFabricUnit<"Melee">, _player: Player, data: MeleeTransmitData) => void;

	activate?: (this: ThisFabricUnit<"Melee">, origin: CFrame, size: Vector3) => Promise<void>;
}

declare global {
	interface FabricUnits {
		Melee: Melee;
	}
}

export = identity<Melee>({
	name: "Melee",

	units: {
		Replicated: {},
	},

	onLoaded: function (this) {
		const effect_library_cache = Dependency(EffectEmitter).library;
		const effect = effect_library_cache
			.get(this.get("effect_name"))
			.expect(`Could not find ${this.get("effect_name")} in ${effect_library_cache}`);

		this.mergeBaseLayer({
			effect,
		});

		const tool_chain = Dependency(ToolChain);
		const item_position = tool_chain
			.add(this, () => {
				const ref = this.ref;

				this.activate?.(ref.CFrame.mul(new CFrame(new Vector3(0, 0, -3))), new Vector3(3, 5, 4));
			})
			.get_item_position(this)
			.expect("Unexpected Error");

		tool_chain.equip(item_position);
	},

	activate: function (this, origin, size): Promise<void> {
		const character = this.ref.Parent as Model;
		const overlap_params = new OverlapParams();
		overlap_params.FilterDescendantsInstances = [character];
		overlap_params.FilterType = Enum.RaycastFilterType.Blacklist;

		/**
		 * display bound
		const p = new Instance("Part");
		p.Anchored = true;
		p.Transparency = 0.7;
		p.CanCollide = false;
		p.CFrame = origin;
		p.Size = size;
		p.Parent = Workspace;

		Promise.delay(0.3)
			.then(() => p.Destroy())
			.catch((reason) => Log.Warn(reason));
		*/

		return Promise.delay(0.15)
			.then(() => {
				const targets = Workspace.GetPartBoundsInBox(origin, size, overlap_params).filter(
					(instance): instance is BasePart => instance.Name === "HumanoidRootPart",
				);

				this.getUnit("Transmitter")?.sendWithPredictiveLayer({ targets, origin }, "melee", {
					targets,
					origin,
					effect_name: this.get("effect_name"),
				});
			})
			.catch((reason) => Log.Warn(reason));
	},

	effects: [
		function (this) {
			const origin = this.get("origin");
			const effect = this.get("effect");
			const targets = this.get("targets");

			if (origin && effect && targets) {
				effect(
					Players.LocalPlayer.Character!.FindFirstChild("Humanoid")?.FindFirstChild("Animator"),
					origin,
					targets,
				);
			}
		},
	],
});
