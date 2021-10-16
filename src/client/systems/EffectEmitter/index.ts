import { Controller, OnInit } from "@flamework/core";
import { HashMap } from "@rbxts/rust-classes";
import { ReplicatedStorage } from "@rbxts/services";
import { net_remotes } from "shared/Remotes";

@Controller({
	loadOrder: 1,
})
export class EffectEmitter implements OnInit {
	public library = HashMap.empty<string, Callback>();
	public onInit(): void {
		for (const s of ReplicatedStorage.WaitForChild("TS")!.WaitForChild("effect_library")!.GetChildren()) {
			if (s.IsA("ModuleScript")) {
				this.library.entry(s.Name).orInsert(require(s) as Callback);
			}
		}

		net_remotes.Client.WaitFor("broadcast_effect").then((r) => {
			r.Connect((effect_name, ...args) => {
				this.library.get(effect_name).unwrap()(...args);
			});
		});
	}
}
