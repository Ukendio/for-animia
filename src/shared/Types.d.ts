interface ReplicatedStorage extends Instance {
	Shared: Folder & {
		systems: Folder;
	};

	Client: Folder & {
		systems: Folder;
	};
}
