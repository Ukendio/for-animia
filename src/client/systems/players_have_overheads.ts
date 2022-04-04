import { World } from "@rbxts/matter";
import Plasma from "@rbxts/plasma";
import { Node, useInstance } from "@rbxts/plasma/out/Runtime";
import { Players } from "@rbxts/services";
import { Controls } from "client/main.client";
import { Renderable, Target } from "shared/components";

export function players_have_overheads(world: World, controls: Controls, root: Node): void {
	for (const [, { model }] of world.query(Renderable, Target)) {
		const head = model.FindFirstChild("Head") as BasePart;

		if (head) {
			Plasma.start(root, () => {
				const renderer = Players.GetPlayerFromCharacter(model)?.FindFirstChild("PlayerGui");

				if (!renderer) return;

				Plasma.portal(renderer, () => {
					const { opened } = Plasma.widget(() => {
						const [opened, set_opened] = Plasma.useState(false);

						const instance = useInstance(() => {
							return Plasma.create("BillboardGui", {
								Active: true,
								Adornee: head,
								Size: UDim2.fromScale(5, 2),
								StudsOffset: new Vector3(0, 3, 0),
								[1]: Plasma.create("TextButton", {
									Size: UDim2.fromScale(1, 0.5),
									Activated: () => {
										set_opened((last) => {
											return !last;
										});
									},
								}),
								[2]: Plasma.create("Frame", {
									Size: UDim2.fromScale(1, 0.5),
									AnchorPoint: new Vector2(0, 1),
									Position: UDim2.fromScale(0, 1),
									BackgroundTransparency: opened ? 0 : 1,
								}),
							});
						});

						return {
							opened,
						};
					});

					Plasma.arrow(Vector3.zero, new Vector3(10, 0, 0));
					// create a plasma arrow
					Plasma.arrow(Vector3.zero, new Vector3(10, 0, 0));
					// create 5 plasma arrows in a row
					Plasma.arrow(Vector3.zero, new Vector3(1));
				});
			});
		}
	}
}
