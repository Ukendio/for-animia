import { GenericOfComponent } from "@rbxts/matter";
import * as Components from "shared/components";

declare type ComponentNames = keyof typeof Components;
declare type MappedComponentToName<T extends ComponentNames> = GenericOfComponent<ReturnType<typeof Components[T]>>;

declare type ComponentsMap<T extends ComponentNames> = T extends []
	? T
	: T extends [infer F, ...infer B]
	? F extends keyof T
		? B extends ComponentNames
			? [MappedComponentToName<T>, ...ComponentsMap<B>]
			: never
		: never
	: never;

declare type UnionComponentsMap = ComponentsMap<ComponentNames>;
