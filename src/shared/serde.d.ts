import { AnyEntity } from "@rbxts/matter";
import { EffectVariant } from "./effects_db";

type SerializedMappedEffect = {
	creator?: AnyEntity;
	variant: EffectVariant;
	target?: AnyEntity;
	pos?: Vector3;
};
