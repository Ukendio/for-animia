type BowModel = Accessory & {
	Handle: Part & {
		TopBeam: Beam;
		OriginalSize: Vector3Value;
		Bottom: Attachment;
		AccessoryWeld: Weld;
		Top: Attachment;
		Middle: Attachment;
		TouchInterest: TouchTransmitter;
		BottomBeam: Beam;
		FireSound: Sound;
		LeftGripAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		Mesh: SpecialMesh;
		HitSound: Sound;
	};
	BowLauncher: Script;
};

type ArcherModel = Model & {
	BowModel: BowModel;
	LeftLowerArm: MeshPart & {
		LeftElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftElbow: Motor6D;
		OriginalSize: Vector3Value;
		LeftWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	LeftFoot: MeshPart & {
		OriginalSize: Vector3Value;
		LeftAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftAnkle: Motor6D;
	};
	AnimSaves: Model & {
		Bow: KeyframeSequence;
	};
	RightHand: MeshPart & {
		RightWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightWrist: Motor6D;
		RightGripAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
	};
	HumanoidRootPart: Part & {
		RootRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
	};
	RightLowerLeg: MeshPart & {
		RightKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightKnee: Motor6D;
		OriginalSize: Vector3Value;
	};
	LeftUpperLeg: MeshPart & {
		OriginalSize: Vector3Value;
		LeftHip: Motor6D;
		LeftHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	LeftLowerLeg: MeshPart & {
		OriginalSize: Vector3Value;
		LeftKnee: Motor6D;
		LeftAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	LowerTorso: MeshPart & {
		WaistCenterAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		Root: Motor6D;
		RootRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		WaistRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		WaistBackAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		WaistFrontAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	Head: Part & {
		HatAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		NeckRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		FaceFrontAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		face: Decal;
		HairAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		Neck: Motor6D;
		Mesh: SpecialMesh;
		FaceCenterAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	UpperTorso: MeshPart & {
		RightCollarAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		BodyBackAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		NeckRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftCollarAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		Waist: Motor6D;
		RightShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		BodyFrontAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		WaistRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		NeckAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};

	LeftUpperArm: MeshPart & {
		LeftShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftShoulder: Motor6D;
		LeftShoulderAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
	};
	RightLowerArm: MeshPart & {
		RightWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		RightElbow: Motor6D;
		RightElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	LeftHand: MeshPart & {
		LeftWrist: Motor6D;
		LeftGripAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		LeftWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	HoodedAssassin: Hat & {
		Handle: Part & {
			HatAttachment: Attachment;
			Mesh: SpecialMesh;
			TouchInterest: TouchTransmitter;
		};
	};
	Humanoid: Humanoid & {
		Animator: Animator;
	};
	RightUpperArm: MeshPart & {
		OriginalSize: Vector3Value;
		RightElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightShoulderAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightShoulder: Motor6D;
	};
	RightUpperLeg: MeshPart & {
		RightKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		RightHip: Motor6D;
		RightHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	RightFoot: MeshPart & {
		RightAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightAnkle: Motor6D;
		OriginalSize: Vector3Value;
	};
};

type Dummy = Model & {
	LeftLowerArm: MeshPart & {
		LeftElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftElbow: Motor6D;
		OriginalSize: Vector3Value;
		LeftWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	LeftFoot: MeshPart & {
		OriginalSize: Vector3Value;
		LeftAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftAnkle: Motor6D;
	};
	RightHand: MeshPart & {
		RightWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightWrist: Motor6D;
		RightGripAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
	};
	HumanoidRootPart: Part & {
		RootRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
	};
	RightLowerLeg: MeshPart & {
		RightKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightKnee: Motor6D;
		OriginalSize: Vector3Value;
	};
	LeftUpperLeg: MeshPart & {
		OriginalSize: Vector3Value;
		LeftHip: Motor6D;
		LeftHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	LeftLowerLeg: MeshPart & {
		OriginalSize: Vector3Value;
		LeftKnee: Motor6D;
		LeftAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	LowerTorso: MeshPart & {
		WaistCenterAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		Root: Motor6D;
		RootRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		WaistRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		WaistBackAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		WaistFrontAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	Head: Part & {
		HatAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		NeckRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		FaceFrontAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		face: Decal;
		HairAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		Neck: Motor6D;
		Mesh: SpecialMesh;
		FaceCenterAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	UpperTorso: MeshPart & {
		RightCollarAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		BodyBackAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		NeckRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftCollarAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		Waist: Motor6D;
		RightShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		BodyFrontAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		WaistRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		NeckAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	LeftUpperArm: MeshPart & {
		LeftShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftShoulder: Motor6D;
		LeftShoulderAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		LeftElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
	};
	RightLowerArm: MeshPart & {
		RightWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		RightElbow: Motor6D;
		RightElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	LeftHand: MeshPart & {
		LeftWrist: Motor6D;
		LeftGripAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		LeftWristRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	Humanoid: Humanoid;
	RightUpperArm: MeshPart & {
		OriginalSize: Vector3Value;
		RightElbowRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightShoulderRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightShoulderAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightShoulder: Motor6D;
	};
	RightUpperLeg: MeshPart & {
		RightKneeRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		OriginalSize: Vector3Value;
		RightHip: Motor6D;
		RightHipRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
	};
	RightFoot: MeshPart & {
		RightAnkleRigAttachment: Attachment & {
			OriginalPosition: Vector3Value;
		};
		RightAnkle: Motor6D;
		OriginalSize: Vector3Value;
	};
};

type ArrowModel = Model & {
	Handle: Part & {
		Mesh: SpecialMesh;
	};
};

type IslandNames = "[1] Foo" | "[2] Bar";

type Particles = Folder & {
	Ice: Folder & {
		Ice: Part & {
			Particles: Attachment & {
				Drops: ParticleEmitter;
				Specs: ParticleEmitter;
			};
			Attachment: Attachment & {
				Trail: Trail;
			};
			A1: Attachment;
			PointLight: PointLight;
		};
		Hit: Part & {
			Attachment: Attachment & {
				Specs: ParticleEmitter;
				Spark: ParticleEmitter;
				Shards: ParticleEmitter;
				Snowflakes: ParticleEmitter;
				Smoke: ParticleEmitter;
				PointLight: PointLight;
				Gradient: ParticleEmitter;
			};
		};
	};
};

type MarcusFix = Model & {
	["[Interactable]Devil's Sword"]: Model & {
		["Cube.022"]: MeshPart;
		["Cube.020"]: MeshPart;
		["Cube.014"]: MeshPart;
		["Cube.001"]: MeshPart;
		["Cube.010"]: MeshPart;
		["Cube.009"]: MeshPart;
		Cube: MeshPart;
		["Cube.013"]: MeshPart;
		["Cube.019"]: MeshPart;
		["Cube.004"]: MeshPart;
		["Cube.023"]: MeshPart;
		Circle: MeshPart;
		ProximityPrompt: ProximityPrompt & {
			WeaponName: StringValue;
			WeaponType: StringValue;
			WeaponNickName: StringValue;
			WeaponRarity: IntValue;
		};
		["Cube.016"]: MeshPart;
		["Cube.024"]: MeshPart;
		["Cube.015"]: MeshPart;
		["Cube.048"]: MeshPart;
		["Cube.012"]: MeshPart;
		["Cube.003"]: MeshPart;
		["Cube.007"]: MeshPart;
		["Cube.021"]: MeshPart;
		["Circle.001"]: MeshPart;
		["Cube.018"]: MeshPart;
		["Cube.002"]: MeshPart;
		["Cube.006"]: MeshPart;
		["Cube.008"]: MeshPart;
		["Cube.005"]: MeshPart;
	};
	["[Interactable]MagicBook"]: Model & {
		["Belt Buckle"]: Model & {
			Nails: MeshPart;
			Belt: MeshPart;
			["Belt Thingy"]: MeshPart;
		};
		["Left Cover"]: Model & {
			["Left Acc"]: MeshPart;
			["Left Inside"]: MeshPart;
			["Small Orbs"]: MeshPart;
			["Left Corners"]: MeshPart;
			["Left Cover"]: MeshPart;
			["Big Orb Ring"]: MeshPart;
			["Big Orb"]: MeshPart;
			["Small Orbs Rings"]: MeshPart;
		};
		ProximityPrompt: ProximityPrompt & {
			WeaponName: StringValue;
			WeaponType: StringValue;
			WeaponNickName: StringValue;
			WeaponRarity: IntValue;
		};
		["Right Cover"]: Model & {
			["Right Acc"]: MeshPart;
			["Right Inside"]: MeshPart;
			["Right Corners"]: MeshPart;
			["Right Cover"]: MeshPart;
			["Back Orbs Rings"]: MeshPart;
			["Back Orbs"]: MeshPart;
		};
		Pages: Model & {
			["Page Four"]: MeshPart;
			["Page Five"]: MeshPart;
			["Page Two"]: MeshPart;
			["Page Six"]: MeshPart;
			["Page Three"]: MeshPart;
			["Page One"]: MeshPart;
		};
		["Cover Back Part"]: Model & {
			["Cover Back"]: MeshPart;
			["Cover Clamps"]: MeshPart;
		};
	};
	["[Interactable]Hero's Sword"]: Model & {
		ProximityPrompt: ProximityPrompt & {
			WeaponName: StringValue;
			WeaponType: StringValue;
			WeaponNickName: StringValue;
			WeaponRarity: IntValue;
		};
		Script: Script;
		["Meshes/sworder_Cube.003"]: MeshPart;
		["Meshes/sworder_Cube.001"]: MeshPart;
		["Meshes/sworder_Cylinder.001"]: MeshPart;
		["Meshes/sworder_Cylinder.003"]: MeshPart;
	};
	Sword01: Model & {
		Handle: Part & {
			TrailTop: Attachment;
			Trail: Trail;
			Effect: ParticleEmitter;
			Slash: Sound;
			TrailBottom: Attachment;
			Equip: Sound;
		};
		Blade: Part;
	};
	["[Interactable]Spear"]: Model & {
		ProximityPrompt: ProximityPrompt & {
			WeaponName: StringValue;
			WeaponType: StringValue;
			WeaponNickName: StringValue;
			WeaponRarity: IntValue;
		};
	};
	["[Interactable]Dagger"]: Model & {
		ProximityPrompt: ProximityPrompt & {
			WeaponName: StringValue;
			WeaponType: StringValue;
			WeaponNickName: StringValue;
			WeaponRarity: IntValue;
		};
	};
};

type IterableSignal<T extends { Connect: Callback }> = RBXScriptSignal<Parameters<T["Connect"]>[0]>;

type Enumerate<T extends { [index: string]: Callback }> = ReturnType<T[keyof T]>;
