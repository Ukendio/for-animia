declare namespace WindLines {
	export interface WindLinesSettings {
		Lifetime?: number;
		Direction?: Vector3;
		Speed?: number;
		SpawnRate?: number;
	}
}

interface WindLines {
	Init(settings: WindLines.WindLinesSettings): void;
}

declare const WindLines: WindLines;

export = WindLines;
