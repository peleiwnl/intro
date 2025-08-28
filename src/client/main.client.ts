import * as spr from "@rbxts/spr";
import { Players } from "@rbxts/services";
import { loadingscreen } from "./loadscreen/loading.service";
import { menuscreen } from "./loadscreen/menu.service";
const camera = game.Workspace.CurrentCamera as Camera;

function transition_to(position: CFrame | Instance, fn?: () => void) {
	camera.CameraType = Enum.CameraType.Scriptable;

	let target: CFrame;
	if (typeIs(position, "Instance")) {
		const inst = position as BasePart;
		target = inst.CFrame;
	} else {
		target = position as CFrame;
	}

	spr.target(camera, 1, 1, { CFrame: target });

	if (fn) fn();
}

async function run() {
	loadingscreen();

	const player = Players.LocalPlayer;
	const playerScripts = player.WaitForChild("PlayerScripts") as PlayerScripts;
	playerScripts.WaitForChild("PlayerModule").WaitForChild("CameraModule");

	camera.CFrame = new CFrame(0, 50, 0);

	transition_to(new CFrame(10, 5, 10), () => {
		menuscreen();
		camera.CameraType = Enum.CameraType.Custom;
	});
}

run();
