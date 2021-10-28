import type { ThisFabricUnit, UnitDefinition } from "@rbxts/fabric";
import type { CharacterRigR15 } from "@rbxts/promise-character";
import type { Option } from "@rbxts/rust-classes";

export interface MODULE_DECLARATION extends LuaSourceContainer {
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

export interface BasicPunch extends UnitDefinition<"BasicPunch"> {
	units: {
		Replicated: {};
		Melee: {
			targets: Option<Array<BasePart>>;
			origin: Option<CFrame>;
			damage: number;
		};
	};

	defaults?: {
		animation_index: 0 | 1 | 2 | 3;
		caster: Option<CharacterRigR15>;
		origin: Option<CFrame>;
		targets: Option<Array<BasePart>>;
	};

	emit?: (
		this: ThisFabricUnit<"BasicPunch">,
		animation_index: number,
		caster: CharacterRigR15,
		origin: CFrame,
		targets: Option<Array<BasePart>>,
	) => void;

	onClientEmit_basic_punch?: (
		this: ThisFabricUnit<"BasicPunch">,
		player: Player,
		data: {
			animation_index: number;
			caster: Player;
			origin: CFrame;
			targets: Array<BasePart>;
		},
	) => void;
}

declare global {
	interface FabricUnits {
		BasicPunch: BasicPunch;
	}
}
