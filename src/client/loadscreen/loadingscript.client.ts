import { Players, ContentProvider, StarterGui } from "@rbxts/services";

if (!game.IsLoaded()) {
	game.Loaded.Wait();
}

StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Health, false);
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false);
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Chat, false);
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, false);

const player = Players.LocalPlayer;
const character = player.Character ?? player.CharacterAdded.Wait()[0];
const humanoidRoot = character.WaitForChild("HumanoidRootPart") as BasePart;
humanoidRoot.Anchored = true;
const gui = player.WaitForChild("PlayerGui");
const loadingUi = gui.WaitForChild("LoadingGui") as ScreenGui;
loadingUi.Parent = gui;

const loadingText = loadingUi.FindFirstChild("Frame")?.FindFirstChild("Loading") as TextLabel;

const parts = game.GetDescendants().filter((inst): inst is Part => inst.IsA("Part"));
const allParts = parts.size();

let myVal = 0;

for (const part of parts) {
	ContentProvider.PreloadAsync([part]);
	myVal++;

	loadingText.Text = myVal + "/" + allParts;
}

loadingUi.Destroy();
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Health, true);
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, true);
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Chat, true);
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, true);
humanoidRoot.Anchored = false;
