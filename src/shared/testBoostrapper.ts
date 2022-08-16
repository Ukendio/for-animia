import { RunService } from "@rbxts/services";
import TestEz from "@rbxts/testez";

export function testBootStrapper(tests: Array<Instance>): void {
	if (RunService.IsStudio()) {
		TestEz.TestBootstrap.run(tests);
	}
}
