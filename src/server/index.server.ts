import { start } from "shared/start";
import { emitEffects } from "shared/emitEffects";

declare const script: { systems: Folder };
emitEffects(start(script.systems, {}));
