import { component } from "@rbxts/matter";

export const Group = component<{ uid: number }>("Group");

export type Group = ReturnType<typeof Group>;
