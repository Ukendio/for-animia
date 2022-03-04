import { Option } from "@rbxts/rust-classes"

const anim = new Instance("Animation")
export function play_anim(humanoid: Humanoid, anim_id: string): AnimationTrack {

    anim.AnimationId = anim_id

    return Option.wrap(humanoid.FindFirstChildOfClass("Animator")).match((animator)=> animator, ()=> {
        const animator = new Instance("Animator")
        animator.Parent = humanoid
        return animator
    }).LoadAnimation(anim)
}