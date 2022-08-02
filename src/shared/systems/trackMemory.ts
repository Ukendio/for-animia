import { DebugWidgets, World } from "@rbxts/matter";
import { Stats } from "@rbxts/services";

const startInstanceCOunt = Stats.InstanceCount;
const startMemory = Stats.GetTotalMemoryUsageMb();
const startTime = os.clock();

function trackMemory(_world: World, _state: object, ui: DebugWidgets): void {
	const currentInstanceCount = Stats.InstanceCount;
	const currentMemory = Stats.GetTotalMemoryUsageMb();

	ui.window("Memory Stats", () => {
		ui.label(`Instances:  ${currentInstanceCount}`);

		ui.label(`Gained Instances: ${currentInstanceCount - startInstanceCOunt}`);

		ui.label(`Memory: ${string.format("%.1f", currentMemory)}`);

		ui.label(`Gained Memory: ${string.format("%.1f", currentMemory - startMemory)}`);

		ui.label(`Time: ${string.format("%.1f", os.clock() - startTime)}`);
	});
}

export = trackMemory;
