/// <reference types="@rbxts/testez/globals" />;

import { a } from "@rbxts/fitumi";
import { World } from "@rbxts/matter";
import { HttpService } from "@rbxts/services";
import damageHurts from "server/systems/damageHurts";
import { Client, CombatStats, Effect, Renderable } from "shared/components";
import { EffectVariant } from "shared/effects";

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
	describe("damageHurts.spec", () => {
		it("target enemy should have 90 hp left", () => {
			const world = new World();
			const targetModel = a.fake<Model>();
			const targetEntity = world.spawn(
				Renderable({ model: targetModel }),
				CombatStats({ hp: 100, maxHp: 100, damage: 5 }),
			);
			a.callTo(targetModel["GetAttribute"] as never, targetModel, "entityId").returns(targetEntity);

			const player = a.fake<Player>();
			const playerEntity = world.spawn(Client());
			a.callTo(player["GetAttribute"] as never, player, "entityId").returns(playerEntity);

			world.spawn(
				Effect({
					variant: EffectVariant.Damage(10),
					predictionGUID: HttpService.GenerateGUID(false),
					source: player,
					target: targetModel,
				}),
			);

			damageHurts(world);
			assertFuzzyEq(world.get(targetEntity, CombatStats).hp, 90);
		});
	});
};
