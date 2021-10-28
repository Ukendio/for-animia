import type { UnitDefinition, ThisFabricUnit } from "@rbxts/fabric";
import type { Option, Result } from "@rbxts/rust-classes";
import type { MeleeTransmitData, NoSuchThing } from "shared/Types";

export interface Melee extends UnitDefinition<"Melee"> {
	units: {
		Replicated: {};
	};

	defaults?: {
		targets: Option<Array<BasePart>>;
		origin: Option<CFrame>;
		damage: number;
	};

	onClientMelee?: (this: ThisFabricUnit<"Melee">, _player: Player, data: MeleeTransmitData) => void;

	hit?: (this: ThisFabricUnit<"Melee">, size: Vector3) => Result<Option<Array<BasePart>>, NoSuchThing>;
}

declare global {
	interface FabricUnits {
		Melee: Melee;
	}
}
