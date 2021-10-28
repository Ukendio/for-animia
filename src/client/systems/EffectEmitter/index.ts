import { Controller, Dependency, OnInit } from "@flamework/core";
import { HashMap } from "@rbxts/rust-classes";
import { ReplicatedStorage } from "@rbxts/services";
import { UnitConstructor } from "../UnitConstructor";

@Controller({
	loadOrder: 1,
})
export class EffectEmitter implements OnInit {
	constructor(private unit_constructor: UnitConstructor) {}

	public library = HashMap.empty<string, Callback>();
	public onInit(): void {}
}
