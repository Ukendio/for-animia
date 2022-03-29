import Plasma from "@rbxts/plasma";
import { RunService, Workspace } from "@rbxts/services";

export = (target: Instance): Callback => {
	const root = new Plasma(target);

	const connection = RunService.Heartbeat.Connect(() => {
		Plasma.start(root, () => {
			Plasma.portal(Workspace, () => {
				Plasma.arrow(Vector3.zero, new Vector3(5, 0, 0));
				Plasma.arrow(Vector3.zero, new Vector3(0, 5, 0));
				Plasma.arrow(Vector3.zero, new Vector3(0, 0, 5));
			});
		});
	});
	return function (): void {
		connection.Disconnect();
	};
};
