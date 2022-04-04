import { useHookState, useThrottle } from "@rbxts/matter";

interface AnimationStorage {
	animation_track?: AnimationTrack;
	animation: Animation;
	played: boolean;
}

export function cleanup(storage: AnimationStorage): void {
	if (storage.animation_track) {
		storage.animation_track.Stop();
		storage.animation_track.Destroy();
		storage.animation.Destroy();
	}
}

export function use_anim(animator: Animator, animation: Animation, pause = false): AnimationTrack {
	const storage = useHookState<AnimationStorage>(animator, cleanup);

	if (storage.animation !== animation) {
		storage.animation = animation;

		if (storage.animation_track) {
			storage.animation_track.Play();
			storage.played = true;
			storage.animation_track.Destroy();
		}
	}
	if (storage.animation_track === undefined) {
		storage.animation_track = animator.LoadAnimation(animation);
	}

	const looped = storage.animation_track.Looped;

	if (!storage.animation_track.IsPlaying && (looped ?? (!looped && !storage.played))) {
		storage.played = true;
		storage.animation_track.Play();
	}

	storage.animation_track.AdjustSpeed(pause ? 0 : 1);

	return storage.animation_track;
}
