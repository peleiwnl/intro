import { Players, StarterGui } from "@rbxts/services";

export function menuscreen() {
	const player = Players.LocalPlayer;
	const gui = player.WaitForChild("PlayerGui") as PlayerGui;
	const menuGui = gui.WaitForChild("MenuGui") as ScreenGui;

	menuGui.Enabled = true;
	task.wait(5);
	menuGui.Enabled = false;

	const coreGuis = [
		Enum.CoreGuiType.Health,
		Enum.CoreGuiType.Backpack,
		Enum.CoreGuiType.Chat,
		Enum.CoreGuiType.PlayerList,
	];

	for (const cg of coreGuis) {
		StarterGui.SetCoreGuiEnabled(cg, true);
	}
}
