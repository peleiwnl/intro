import { Players, ContentProvider, StarterGui } from "@rbxts/services";

export function loadingscreen() {
	const coreGuis = [
		Enum.CoreGuiType.Health,
		Enum.CoreGuiType.Backpack,
		Enum.CoreGuiType.Chat,
		Enum.CoreGuiType.PlayerList,
	];

	for (const cg of coreGuis) {
		StarterGui.SetCoreGuiEnabled(cg, false);
	}

	const player = Players.LocalPlayer;

	if (!player) Players.PlayerAdded.Wait();
	const character = player.Character ?? player.CharacterAdded.Wait()[0];

	const humanoidRoot = character.WaitForChild("HumanoidRootPart") as BasePart;
	humanoidRoot.Anchored = true;

	const gui = player.WaitForChild("PlayerGui") as PlayerGui;
	const loadingUi = gui.WaitForChild("LoadingGui") as ScreenGui;

	loadingUi.Enabled = true;
	loadingUi.Parent = gui;

	const loadingText = loadingUi.FindFirstChild("Frame")?.FindFirstChild("Loading") as TextLabel;

	task.wait(0.1);

	const parts = game.GetDescendants().filter((inst): inst is Part => inst.IsA("Part"));
	const allParts = parts.size();
	let myVal = 0;

	for (const part of parts) {
		ContentProvider.PreloadAsync([part]);
		myVal++;
		loadingText.Text = `${myVal}/${allParts}`;
		task.wait(0.05);
	}

	loadingUi.Destroy();
	humanoidRoot.Anchored = false;
}
