import Plasma from "@rbxts/plasma";
import { Workspace } from "@rbxts/services";

export = (target: Instance): Callback => {
	const root = new Plasma(target);

	Plasma.start(root, () => {
		Plasma.portal(Workspace, () => {
			Plasma.arrow(Vector3.zero, new Vector3(10, 0, 0));
			Plasma.arrow(Vector3.zero, new Vector3(0, 10, 0));
			Plasma.arrow(Vector3.zero, new Vector3(0, 0, 10));
		});
	});

	return function (): void {
		Plasma.start(root, () => {});
	};
};
