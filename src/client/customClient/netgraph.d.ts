declare class Netgraph {
	private constructor();

	public Setup(client: ChickyClient): void;

	public Step(client: ChickyClient, dt: number): void;
}
