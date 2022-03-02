import { New, Value, Children } from "@rbxts/fusion";
import { component, useEvent, World } from "@rbxts/matter";
import { Vec } from "@rbxts/rust-classes";
import { Players, UserInputService } from "@rbxts/services";
import { ClientData } from "client/main.client";
import {
	Target,
	Renderable,
	WantsPickUp,
	InBackpack,
	Item,
	Spinning,
	Transform,
	WantsOpenInventory,
} from "shared/components";

const slots = Vec.vec<Frame>();

for (let i = 0; i < 15; i++) {
	const viewport = New("ViewportFrame")({
		Size: UDim2.fromScale(1, 1),
		BackgroundTransparency: 1,
	});

	const viewport_camera = New("Camera")({ CameraType: Enum.CameraType.Scriptable, Parent: viewport });

	const slot = New("Frame")({
		LayoutOrder: i,
		Name: `Slot@${i}`,
		BackgroundColor3: Color3.fromRGB(48, 48, 48),

		[Children]: {
			viewport,
			viewport_camera,
		},
	});

	viewport.CurrentCamera = viewport_camera;

	slots.push(slot);
}

const next_slot_idx = Value(0);

const toggled_menu = Value(true);

const inventory_gui = New("ScreenGui")({
	[Children]: {
		bg: New("Frame")({
			AnchorPoint: new Vector2(0, 0.5),
			Position: UDim2.fromScale(0, 0.5),
			Size: UDim2.fromOffset(400, 300),
			Visible: toggled_menu,

			[Children]: {
				yellow_ln: New("Frame")({
					Size: UDim2.fromScale(1, 0),
					BackgroundColor3: Color3.fromRGB(236, 255, 20),
				}),
				inner_box: New("ScrollingFrame")({
					Size: new UDim2(1, 0, 1, -5),
					BackgroundColor3: Color3.fromRGB(38, 38, 38),
					AnchorPoint: new Vector2(0, 1),
					Position: UDim2.fromScale(0, 1),
					ClipsDescendants: true,
					[Children]: [
						New("UIGridLayout")({
							SortOrder: Enum.SortOrder.LayoutOrder,
							CellPadding: UDim2.fromOffset(3, 5),
							CellSize: UDim2.fromOffset(77, 100),
						}),
						...slots.asPtr(),
					],
				}),
			},
		}),
	},
});

inventory_gui.Parent = Players.LocalPlayer.WaitForChild("PlayerGui");

export function collect_items(world: World, state: ClientData): void {
	for (const [id, , pickup] of world.query(Target, WantsPickUp)) {
		if (pickup.collected_by === id) {
			world.insert(pickup.item, InBackpack({ owner: pickup.collected_by, slot: next_slot_idx.get() }));

			const next_available_slot = slots.get(next_slot_idx.get());

			next_available_slot.match(
				(frame) => {
					const [{ model }, transform] = world.get(pickup.item, Renderable, Transform);

					const viewport = frame.FindFirstChildOfClass("ViewportFrame");
					const cam = viewport?.FindFirstChildOfClass("Camera");

					if (!viewport || !cam) error("camera was not found inside viewport frame");

					cam.CameraSubject = model.PrimaryPart!;

					next_slot_idx.set(next_slot_idx.get() + 1);

					const cf = new CFrame(Vector3.zero);

					cam.CFrame = new CFrame(new Vector3(0, 2, 5), cf.Position);
					world.insert(pickup.item, transform.patch({ cf }), Spinning());

					model.Parent = viewport;
				},
				() => error("no available slots"),
			);
		}

		world.remove(id, WantsPickUp);
	}

	for (const [] of world.query(WantsOpenInventory)) {
		for (const [item_entity, , , transform] of world
			.query(Item, Renderable, Transform, InBackpack)
			.without(Spinning)) {
			world.insert(item_entity, transform.patch({ cf: new CFrame(Vector3.zero) }), Spinning());
		}
	}

	for (const [id] of world.query(Target, Renderable).without(WantsPickUp)) {
		for (const [, { KeyCode }] of useEvent(UserInputService, "InputBegan")) {
			if (KeyCode === state.toggle_menu) {
				toggled_menu.set(!toggled_menu.get());

				if (toggled_menu.get()) world.insert(id, WantsOpenInventory());
				else {
					world.remove(id, WantsOpenInventory);
					for (const [item_entity] of world.query(Item, Spinning)) {
						world.remove(item_entity, Spinning);
					}
				}
			}
		}
	}
}
