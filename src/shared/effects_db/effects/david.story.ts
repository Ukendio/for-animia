import { Children, New, OnChange, OnEvent } from "@rbxts/fusion";
import Plasma from "@rbxts/plasma";
import { RunService } from "@rbxts/services";

export = (target: Instance): Callback => {
	const part = New("Part")({ Position: Vector3.zero });

	const neon_part = part.Clone();
	neon_part.PivotTo(new CFrame(new Vector3(0, 0, -1)));
	neon_part.Size = neon_part.Size.add(Vector3.one);
	neon_part.Color = Color3.fromRGB(255, 255, 0);
	neon_part.Material = Enum.Material.Neon;
	neon_part.Transparency = 0.5;

	const camera = New("Camera")({
		CFrame: new CFrame(new Vector3(0, 0, 5), Vector3.zero),
		CameraSubject: part,
	});

	const image = New("ImageButton")({
		Size: UDim2.fromOffset(400, 300),
		ImageTransparency: 1,
		[Children]: New("ViewportFrame")({
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			CurrentCamera: camera,
			LightColor: Color3.fromRGB(255, 255, 0),
			LightDirection: new Vector3(0.765, 0, 0.805),
			[Children]: [camera, part],
		}),
		[OnEvent("MouseButton1Click")]: () => {
			neon_part.Parent = part;
		},
	});

	image.Parent = target;

	return function (): void {
		image.Destroy();
	};
};
