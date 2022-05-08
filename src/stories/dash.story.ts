import { Loop, useDeltaTime, World } from "@rbxts/matter";
import Plasma from "@rbxts/plasma";
import { Vec } from "@rbxts/rust-classes";
import { ReplicatedStorage, RunService, Workspace } from "@rbxts/services";
import { Renderable } from "shared/components";
export = (target: Instance): Callback => {
	const root = new Plasma(target);
	const world = new World();
	const loop = new Loop(world);
	loop.scheduleSystems([
		(): void => {
			Plasma.start(root, () => {
				Plasma.portal(Workspace, () => Plasma.arrow(origin.Position, cf.Position));
				Plasma.window("Click to Dash", () => {
					if (Plasma.button("Click!").clicked()) {
						if (should_reconcile) return;

						stack_automata.push(() => {
							const direction = dummy.GetPivot().LookVector.mul(15);
							target_cf = target_cf.add(direction);

							should_reconcile = true;
						});
					}
				});

				stack_automata.pop().map((fn) => fn());

				if (should_reconcile) {
					stack_automata.push(() => {
						elapsed += useDeltaTime();
						cf = dummy.GetPivot().Lerp(target_cf, elapsed);
					});
				}

				if (cf === target_cf) {
					stack_automata.push(() => {
						target_cf = origin;
						elapsed = 0;
						cf = origin;
						should_reconcile = false;
					});
				}

				dummy.PivotTo(cf);
			});
		},
	]);

	const connections = loop.begin({ default: RunService.Heartbeat });

	const origin = new CFrame(new Vector3(0, 10, 0));
	let target_cf = origin;
	let cf = origin;

	const dummy = ReplicatedStorage.Assets.Dummy.Clone();
	dummy.PivotTo(cf);
	dummy.Parent = Workspace;

	world.spawn(Renderable({ model: dummy }));

	let elapsed = 0;
	let should_reconcile = false;

	const stack_automata = Vec.vec<Callback>();

	RunService.Heartbeat.Connect(() => {});
	return function (): void {
		dummy.Destroy();
		world.clear();
		connections.default.Disconnect();
		Plasma.start(root, () => {});
	};
};
