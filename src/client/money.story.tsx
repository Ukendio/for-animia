import Roact from "@rbxts/roact";
import { StarterGui } from "@rbxts/services";
import Money from "./money";

export = (target: Instance): (() => void) => {
	const handle = Roact.mount(<Money />, target);
	const studioHandle = Roact.mount(
		<screengui>
			<Money />
		</screengui>,
		StarterGui,
	);

	return function (): void {
		Roact.unmount(handle);
		Roact.unmount(studioHandle);
	};
};
