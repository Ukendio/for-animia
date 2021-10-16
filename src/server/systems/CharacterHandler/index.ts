import { OnInit, Service } from "@flamework/core";
import Log from "@rbxts/log";
import promiseR15 from "@rbxts/promise-character";
import { Players, Workspace } from "@rbxts/services";
import { UnitConstructor } from "../UnitConstructor";

@Service({})
export class CharacterHandler implements OnInit {
	public constructor(private UnitConstructor: UnitConstructor) {}
	public onInit(): void {
		Players.PlayerAdded.Connect((player) => {
			promiseR15(player.Character ?? player.CharacterAdded.Wait()[0])
				.then((character) => {
					while (!character.IsDescendantOf(Workspace)) {
						character.AncestryChanged.Wait();
					}

					this.UnitConstructor.create_melee(player, character.HumanoidRootPart, {
						damage: 25,
						effect_name: "basic_punch",
					});
				})
				.catch((reason) => Log.Warn(reason));
		});
	}
}
