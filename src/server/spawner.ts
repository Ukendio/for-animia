import { HashMap, Vec } from "@rbxts/rust-classes";
import { Workspace } from "@rbxts/services";

const MAX_MONSTERS = 4;

function get_spawn_table_from_map(map: string): Vec<SpawnLocation> {
	return Vec.fromPtr(Workspace.FindFirstChild(map)!.FindFirstChild("Spawns")?.GetChildren() as Array<SpawnLocation>);
}

export function spawn_region(map: string, area: Array<number>, spawn_list: Vec<[number, string]>): void {
	const spawn_table = get_spawn_table_from_map(map);
	const spawn_points = HashMap.empty<number, string>();
	const areas = Vec.fromPtr(area);

	{
		const num_spawns = math.min(areas.len(), math.random(1, MAX_MONSTERS + 3));
		if (num_spawns === 0) return;

		for (let i = 0; i < num_spawns; i++) {
			const array_index = areas.len() === 1 ? 0 : math.random(1, areas.len()) - 1;

			const map_idx = areas.asPtr()[array_index];
		}
	}
}
