declare class GenerateCommand {
	private constructor();

	private client: undefined | ChickyClient;

	public Setup(client: ChickyClient): void;

	public Step(client: ChickyClient): void;

	public GenerateCommand(command: Partial<ChickyCommand>, serverTime: number, dt: number): ChickyCommand;

	public CalculateRawVector(cameraRelativeMoveVector: Vector3): Vector3;

	public GetIsJumping(): boolean;

	public GetAimPoint(): Vector3;
}

export = GenerateCommand;
