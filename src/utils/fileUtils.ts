// fileUtils.ts
import * as vscode from "vscode";
import { executeInitProvider } from "../commands/initProvider";
import { generateFeature } from "../commands/featureService";

export function createFeatureFiles(featureName: string) {
  const workspaceFolder = vscode.workspace.rootPath;
  if (!workspaceFolder) {
    vscode.window.showErrorMessage("No workspace folder found!");
    return;
  }

  generateFeature(workspaceFolder, featureName);
}

export function createInitProviderFiles() {
  const workspaceFolder = vscode.workspace.rootPath;
  if (!workspaceFolder) {
    vscode.window.showErrorMessage("No workspace folder found!");
    return;
  }

  executeInitProvider(workspaceFolder);
}
