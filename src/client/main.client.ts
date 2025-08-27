import * as spr from "@rbxts/spr";

task.wait(5);

const camera = game.Workspace.FindFirstChild("Camera") as Camera;

const currentSubject = camera.CameraSubject;

camera.CameraSubject = undefined;

camera.CFrame = new CFrame(0, 50, 0);

const targetPosition = new CFrame(10, 5, 10);

spr.target(camera, 2, 0.1, { CFrame: targetPosition });

task.wait(2);

camera.CameraSubject = currentSubject;
