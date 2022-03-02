export function get_mass_of_model(model: Model): number {
	let mass = 0;

	model.GetChildren().forEach((v) => {
		if (v.IsA("BasePart")) {
			if (v.Massless === false) {
				mass += v.GetMass();
			}
		}
	});

	return mass / 1.75;
}
