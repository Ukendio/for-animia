import { ice_hit } from ".";

export = (target: Instance): Callback => {
	const effects_model = ice_hit(new Vector3(0, 10, 0));
	return function (): void {
		effects_model.Destroy();
	};
};
