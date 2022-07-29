// Original Author by Sircfenner
const Provider = game.GetService("KeyframeSequenceProvider");
const cache = new Map<string, number>();

export function getAnimationLength(animation: Animation): number {
	const assetId = animation.AnimationId;

	if (cache.has(assetId)) {
		return cache.get(assetId)!;
	}

	const sequence = Provider.GetKeyframeSequenceAsync(assetId);
	const keyframes = sequence.GetKeyframes();

	let length = 0;

	for (const i of $range(1, keyframes.size())) {
		const time = keyframes[i - 1].Time;
		if (time > length) {
			length = time;
		}
	}

	sequence.Destroy();
	cache.set(assetId, length);

	return length;
}
