import { AnyEntity } from "@rbxts/matter";
import { EffectType, EffectTypeInfo } from "./effects_db";

type SerializedMappedEffect = {
	creator?: AnyEntity;
	effect_type: EffectType;
	effect_payload: EffectTypeInfo[EffectType];
	target?: AnyEntity;
	pos?: Vector3;
};
