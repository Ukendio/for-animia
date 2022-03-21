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

interface ReplicatedStorage extends Instance {
	Assets: Folder & {
		ArcherModel: ArcherModel;
		Dummy: Dummy;
		ArrowModel: ArrowModel;
		Islands: Folder;
		Particles: Particles;
	};
}

interface Workspace extends Instance {
	Effects: Folder;
}

type IterableSignal<T extends { Connect: Callback }> = RBXScriptSignal<Parameters<T["Connect"]>[0]>;

type Enumerate<T extends { [index: string]: Callback }> = ReturnType<T[keyof T]>;
