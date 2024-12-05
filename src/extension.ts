import * as vscode from "vscode";
import { createFeatureFiles, createInitProviderFiles } from "./utils/fileUtils"; // Fungsi untuk generate file
import "./utils/string";

export function activate(context: vscode.ExtensionContext) {
  console.log("Extension flutter-clean-architecture diaktifkan!");

  const initProviderCommand = vscode.commands.registerCommand(
    "flutter-clean-architecture.initProvider",
    async () => {
      // Logic untuk init provider
      createInitProviderFiles();
      vscode.window.showInformationMessage("Initializing provider...");
    }
  );

  const generateFeatureCommand = vscode.commands.registerCommand(
    "flutter-clean-architecture.generateFeature",
    async () => {
      // Logic untuk generate feature
      const featureName = await vscode.window.showInputBox({
        placeHolder: "Enter feature name",
        prompt: "Generate a new feature for your app",
      });

      if (featureName) {
        // Logic untuk membuat file dan folder feature
        createFeatureFiles(featureName);
        vscode.window.showInformationMessage(
          `Feature ${featureName} generated successfully!`
        );
      }
    }
  );

  // Daftarkan perintah ke context
  context.subscriptions.push(initProviderCommand);
  context.subscriptions.push(generateFeatureCommand);
}

export function deactivate() {}
