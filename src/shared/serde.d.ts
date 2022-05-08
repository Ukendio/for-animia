import { AnyEntity } from "@rbxts/matter";
import { EffectVariant } from "shared/effects";

type SerializedMappedEffect = {
	variant: EffectVariant;
	target?: Model;
	pos?: Vector3;
	creator?: Player;
};
