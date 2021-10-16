import type basic_punch from "./basic_punch";
import type green_whiplash from "./green_whiplash";

export interface EFFECT_DECLARATION {
	basic_punch: typeof basic_punch;
	green_whiplash: typeof green_whiplash;
}
