import Plasma from "@rbxts/plasma";
import { RunService, Workspace } from "@rbxts/services";

export function playEffect<Fn extends (...args: Parameters<Fn>) => ParticleEmitter>(
	title: string,
	fn: Fn,
	...args: Parameters<Fn>
): Callback {
	return function (target: Instance): Callback {
		const root = new Plasma(target);
		const attachmentsToRemove = new Array<Attachment>();

		let connection = RunService.Heartbeat.Connect(() => {
			Plasma.start(root, () => {
				Plasma.window(title, () => {
					if (Plasma.button("Click Me").clicked()) {
						const attachment = new Instance("Attachment");
						attachment.Parent = Workspace.Terrain;
						attachment.CFrame = Workspace.CurrentCamera!.CFrame.mul(new CFrame(0, 0, -12));
						attachmentsToRemove.push(attachment);

						const particle = fn(...args);
						particle.Parent = attachment;
						task.delay(particle.Lifetime.Max + 0.25, () => attachment.Destroy());
					}
				});
			});
		});

		return function (): void {
			connection.Disconnect();
			connection = undefined!;

			Plasma.start(root, () => {});

			attachmentsToRemove.forEach((attachment) => (attachment.Parent = undefined!));
		};
	};
}
