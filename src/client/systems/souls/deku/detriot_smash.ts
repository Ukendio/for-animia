import { useEvent, World } from "@rbxts/matter";
import { UserInputService } from "@rbxts/services";
import { ClientData } from "client/main.client";
import { Deku, Renderable, Target } from "shared/components";
import { play_anim } from "shared/play_anim";

// animation id 9006471997

export function detriot_smash(world: World, controls: ClientData): void {
    for (const [deku_id, {model}] of world.query(Renderable, Target , Deku)) {
        for (const [, {KeyCode}] of useEvent(UserInputService, "InputBegan")) {
            if (KeyCode === controls.use_ability_1) {
                const humanoid = model.FindFirstChildOfClass("Humanoid");
                
                if (!humanoid) continue;

                play_anim(humanoid, "rbxassetid://").Play();
            
                world.insert(deku_id /**, Punch() */ )
            }
        }
    }
}
