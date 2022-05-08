interface ServerScriptService extends Instance {
	tests: Folder;
}

interface ReplicatedStorage extends Instance {
	Assets: Folder & {
		ArcherModel: ArcherModel;
		Dummy: Dummy;
		ArrowModel: ArrowModel;
		Islands: Folder;
		Particles: Particles;
		MarcusFix: MarcusFix;
	};
}

interface Workspace extends Instance {
	Effects: Folder;
}
