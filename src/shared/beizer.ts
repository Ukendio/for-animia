const lerp = ((a: number, b: number, alpha: number) => a + (b - a) * alpha) as {
	(a: number, b: number, alpha: number): number;
	(a: Vector3, b: Vector3, alpha: number): Vector3;
};

export const quad_beizer = ((t: number, p0: number, p1: number, p2: number) => {
	const l1 = lerp(p0, p1, t);
	const l2 = lerp(p1, p2, t);

	const quad = lerp(l1, l2, t);

	return quad;
}) as {
	(t: number, p0: number, p1: number, p2: number): number;
	(t: number, p0: Vector3, p1: Vector3, p2: Vector3): Vector3;
};
