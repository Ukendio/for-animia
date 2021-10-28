import { Dependency } from "@flamework/core";
import Log from "@rbxts/log";
import { CharacterRigR15 } from "@rbxts/promise-character";
import { match } from "@rbxts/rbxts-pattern";
import { Option, Result, Vec } from "@rbxts/rust-classes";
import { Players, Workspace } from "@rbxts/services";
import { InputMapper } from "client/systems/InputMapper";
import type { NoSuchThing } from "shared/Types";
import { flare } from "./flare";
import type { BasicPunch, MODULE_DECLARATION } from "./mod";
import { rotate_tween } from "./rotate_tween";

const rng = new Random();
const animation = new Instance("Animation");
const module = script as MODULE_DECLARATION;

const next_int = (a: number, b: number) => rng.NextInteger(a, b);

export = identity<BasicPunch>({
	name: "BasicPunch",

	units: {
		Replicated: {},
		Melee: {
			targets: Option.none(),
			origin: Option.none(),
			damage: 15,
		},
	},

	onInitialize: function (this) {
		const player = Players.LocalPlayer;
		const character = player.Character! as CharacterRigR15;

		const input_mapper = Dependency(InputMapper);
		input_mapper.on_input.setup((_, input_type) => {
			if (input_type === Enum.UserInputType.MouseButton1) {
				const origin = (character.WaitForChild("HumanoidRootPart")! as BasePart).CFrame;
				this.getUnit("Melee")!.hit!(new Vector3(10, 10, 10)).match(
					(targets) => this.emit?.(this.get("animation_index") ?? 0, character, origin, targets),
					(reason) => Log.Warn(reason),
				);
			}
		});
	},

	emit: function (this, animation_index, caster, origin, targets): void {
		this.getUnit("Transmitter")!.sendWithPredictiveLayer(
			{
				animation_index,
				caster: Option.some(caster),
				origin: Option.some(origin),
				targets,
			},
			"emit_basic_punch",
			{
				animation_index,
				caster,
				origin,
				targets: targets.asPtr(),
			},
		);
	},

	effects: [
		function (this): void {
			const animation_id = this.get("animation_index");
			const origin_option = this.get("origin");
			const caster = this.get("caster");

			if (caster && origin_option && caster.isSome() && origin_option.isSome()) {
				origin_option.map((origin) => {
					const animator = caster
						.map((caster) => caster.WaitForChild("Humanoid")?.WaitForChild("Animator") as Animator)
						.expect("Could not find animator");

					animation.AnimationId = `rbxassetid://${match(animation_id)
						.with(0, () => "7755891755")
						.with(1, () => "7755905610")
						.with(2, () => "7755908040")
						.with(3, () => "7755911442")
						.exhaustive()}`;
					animator.LoadAnimation(animation).Play();

					const slash = module.prefab.Slash.Clone();
					slash.CFrame = origin.mul(CFrame.Angles(0, math.rad(90), 0));
					slash.Parent = Workspace;

					rotate_tween(slash, -190, 0.3, Enum.EasingStyle.Quad);

					this.get("targets").match(
						(targets) => {
							task.delay(0.1, async () => {
								await flare(
									origin.mul(
										CFrame.Angles(0, math.rad(next_int(-30, 30)), math.rad(next_int(-10, -30))),
									),
									Vec.fromPtr(targets),
								);
							});
						},
						() => Log.Warn("No enemies were found"),
					);
				});
			}
		},
	],
});
