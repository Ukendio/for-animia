import { Flamework } from "@flamework/core";
import ZirconRemotes from "@rbxts/zircon/out/Shared/Remotes";
import { net_remotes } from "shared/Remotes";

const c = net_remotes.Server;
c.Create("construct_unit");

Flamework.addPaths("src/server/systems");
Flamework.ignite();

const z = ZirconRemotes.Server;
z.Create("ZrSOi4/GetServerLogMessages");
z.Create("ZrSiO4/DispatchToServer");
z.Create("ZrSiO4/GetPlayerPermissions");
z.Create("ZrSiO4/StandardError");
z.Create("ZrSiO4/StandardOutput");
