/// <reference types="@rbxts/testez/globals" />;

import { Loop, World } from "@rbxts/matter";
import { RunService } from "@rbxts/services";
import { Lifetime } from "shared/components";
import lifetimesDie from "shared/systems/lifetimesDie";

export = (): void => {
	function assertFuzzyEq<T>(a: T, b: unknown): b is T {
		function inner(): boolean {
			if (a === b) return true;

			if (typeOf(a) === typeOf(b)) {
				if (typeIs(a, "number")) {
					const dec = 2;
					const tens = 10 ** dec;

					return math.floor(a * tens + 0.5) / tens === math.floor((b as number) * tens + 0.5) / tens;
				}
			}
			return false;
		}

		const innerResult = inner();
		expect(innerResult).to.equal(true);
		return innerResult;
	}
	describe("lifetimesDie.spec", () => {
		it("should despawn entity after 5 seconds", () => {
			const world = new World();
			const id = world.spawn(Lifetime({ spawnedAt: os.clock(), length: 5, elapsed: 0 }));

			const loop = new Loop(world);
			loop.scheduleSystem(lifetimesDie);
			loop.begin({ default: RunService.Heartbeat });

			task.wait(6);
			assertFuzzyEq(world.contains(id), false);
		});

		it("should keep entity alive before 5 seconds has elapsed", () => {
			const world = new World();
			const id = world.spawn(Lifetime({ spawnedAt: os.clock(), length: 5, elapsed: 0 }));

			const loop = new Loop(world);
			loop.scheduleSystem(lifetimesDie);
			loop.begin({ default: RunService.Heartbeat });

			task.wait(2);
			assertFuzzyEq(world.contains(id), true);
		});
	});
};
