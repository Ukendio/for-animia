import { DebugWidgets, World } from "@rbxts/matter";
import { ClientState } from "client/index.client";
import { Stats } from "@rbxts/services";

function networkDiagnostics(world: World, _: ClientState, ui: DebugWidgets): void {
	ui.heading("DataReceiveKbps");
	ui.label(tostring(Stats.DataReceiveKbps));

	ui.space(8);

	ui.heading("DataSendKbps");
	ui.label(tostring(Stats.DataSendKbps));
}

export = networkDiagnostics;
