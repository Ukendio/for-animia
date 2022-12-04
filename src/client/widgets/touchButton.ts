import Plasma from "@rbxts/plasma";

declare namespace touchButton {
	interface TouchButtonOptions {
		marker: string;
		image?: string;
		position: UDim2;
		size: UDim2;
	}

	interface TouchButtonHandle {
		heldFor: () => number;
		tapped: () => boolean;
		instance: ImageButton;
	}
}

const touchButton = Plasma.widget((options?: touchButton.TouchButtonOptions) => {
	const [startClickTime, setClickTime] = Plasma.useState(-1);
	const [tapped, setTapped] = Plasma.useState(false);

	interface Refs {
		touchButton: ImageButton;
		[index: string]: Instance;
	}

	const refs = Plasma.useInstance<Refs>((ref) => {
		return Plasma.create("ImageButton", {
			[ref]: "touchButton",
			Name: options?.marker,
			Image: options?.image,
			Size: options?.size,
			Position: options?.position,
			InputBegan: () => {
				setClickTime(os.clock());
			},
			InputEnded: () => {
				setClickTime(-1);
			},
			Activated: () => {
				setTapped(true);
			},
		});
	});
	const handle = {
		heldFor: (): number => {
			if (startClickTime === -1) {
				return 0;
			} else return os.clock() - startClickTime;
		},
		tapped: function (): boolean {
			if (tapped) {
				setTapped(false);
				return true;
			}
			return false;
		},
		instance: refs.touchButton,
	};

	return handle;
});

export = touchButton;
