import { Option, Result } from "@rbxts/rust-classes";
import { Players, Workspace } from "@rbxts/services";
import { NoSuchThing } from "shared/Types";
import { Melee } from "./mod";

const player = Players.LocalPlayer;
const overlap_params = new OverlapParams();
overlap_params.FilterType = Enum.RaycastFilterType.Blacklist;

export = identity<Melee>({
	name: "Melee",

	units: {
		Replicated: {},
	},

	hit: function (this, size): Result<Option<Array<BasePart>>, NoSuchThing> {
		const caster_body = player.Character;
		const root = caster_body?.FindFirstChild("HumanoidRootPart") as BasePart;

		if (!caster_body || !root) return Result.err(NoSuchThing);
		overlap_params.FilterDescendantsInstances = [caster_body];

		const origin = root.CFrame;

		const targets = Workspace.GetPartBoundsInBox(origin, size, overlap_params).filter(
			(instance): instance is BasePart => instance.Name === "HumanoidRootPart",
		);

		if (next(targets) !== undefined) {
			this.getUnit("Transmitter")?.send("melee", { origin, targets });

			return Result.ok(Option.some(targets));
		} else return Result.ok(Option.none());
	},
});
