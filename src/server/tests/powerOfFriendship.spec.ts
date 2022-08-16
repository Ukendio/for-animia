/// <reference types="@rbxts/testez/globals" />;

import { a } from "@rbxts/fitumi";
import { World } from "@rbxts/matter";
import { Client } from "shared/components";
import powerOfFriendship from "../systems/powerOfFriendship";

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
	describe("Player with VIP", () => {
		it("Lonely player should have 1.5 as rewards multiplier", () => {
			const world = new World();
			world.optimizeQueries();
			const fakePlayer = a.fake<Player>();
			fakePlayer.UserId = 1;

			const id = world.spawn(
				Client({
					player: fakePlayer,
					lineSight: Vector3.zero,
					document: { rewardsMultiplier: 1, bonusMultiplier: 1.5 },
				}),
			);

			powerOfFriendship(world);

			expect(world.get(id, Client).document.rewardsMultiplier).equal(1.5);
		});
		it("Having 5 friends should have 1.65 as rewards multiplier", () => {
			const world = new World();
			world.optimizeQueries();
			const fakePlayer = a.fake<Player>();
			fakePlayer.UserId = 1;

			const id = world.spawn(
				Client({
					player: fakePlayer,
					lineSight: Vector3.zero,
					document: { rewardsMultiplier: 1, bonusMultiplier: 1.5 },
				}),
			);

			// we start the range at two because player userId is going to be 1.
			for (const i of $range(2, 6)) {
				const fakeFriend = a.fake<Player>();
				fakeFriend.UserId = i;
				fakeFriend.AccountAge = 30;
				a.callTo(fakePlayer["IsFriendsWith"] as never, fakePlayer, i).returns(true);
				world.spawnAt(
					i,
					Client({ player: fakeFriend, lineSight: Vector3.zero, document: { rewardsMultiplier: 1 } }),
				);
			}

			// We fill remaining players as non-friends, to make sure we don't give bonus when they are not friends
			for (const i of $range(7, 10)) {
				const fakeFriend = a.fake<Player>();
				fakeFriend.UserId = i;
				fakeFriend.AccountAge = 30;
				a.callTo(fakePlayer["IsFriendsWith"] as never, fakePlayer, i).returns(false);
				world.spawnAt(
					i,
					Client({ player: fakeFriend, lineSight: Vector3.zero, document: { rewardsMultiplier: 1 } }),
				);
			}

			powerOfFriendship(world);

			assertFuzzyEq(world.get(id, Client).document.rewardsMultiplier, 1.65);
		});
	});

	describe("Player without VIP", () => {
		it("Lonely player should have 1 as rewards multiplier", () => {
			const world = new World();
			world.optimizeQueries();
			const fakePlayer = a.fake<Player>();
			fakePlayer.UserId = 1;

			const id = world.spawn(
				Client({ player: fakePlayer, lineSight: Vector3.zero, document: { rewardsMultiplier: 1 } }),
			);

			powerOfFriendship(world);

			assertFuzzyEq(world.get(id, Client).document.rewardsMultiplier, 1);
		});
		it("Having 5 friends should have 1.1 as rewards multiplier", () => {
			const world = new World();
			world.optimizeQueries();
			const fakePlayer = a.fake<Player>();
			fakePlayer.UserId = 1;

			const id = world.spawn(
				Client({ player: fakePlayer, lineSight: Vector3.zero, document: { rewardsMultiplier: 1 } }),
			);

			// we start the range at two because player userId is going to be 1.
			for (const i of $range(2, 6)) {
				const fakeFriend = a.fake<Player>();
				fakeFriend.UserId = i;
				fakeFriend.AccountAge = 30;
				a.callTo(fakePlayer["IsFriendsWith"] as never, fakePlayer, i).returns(true);
				world.spawnAt(
					i,
					Client({ player: fakeFriend, lineSight: Vector3.zero, document: { rewardsMultiplier: 1 } }),
				);
			}

			// We fill remaining players as non-friends, to make sure we don't give bonus when they are not friends
			for (const i of $range(7, 10)) {
				const fakeFriend = a.fake<Player>();
				fakeFriend.UserId = i;
				fakeFriend.AccountAge = 30;
				a.callTo(fakePlayer["IsFriendsWith"] as never, fakePlayer, i).returns(false);
				world.spawnAt(
					i,
					Client({ player: fakeFriend, lineSight: Vector3.zero, document: { rewardsMultiplier: 1 } }),
				);
			}

			powerOfFriendship(world);

			assertFuzzyEq(world.get(id, Client).document.rewardsMultiplier, 1.1);
		});
	});
};
