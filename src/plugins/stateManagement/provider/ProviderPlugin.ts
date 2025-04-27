import * as vscode from "vscode";
import { Plugin } from "../../../core/interfaces/Plugin";
import {
  CommandProvider,
  Command,
} from "../../../core/interfaces/CommandProvider";
import { ProviderGenerator } from "./ProviderGenerator";

export class ProviderPlugin implements Plugin, CommandProvider {
  id = "provider";
  name = "Provider";
  description = "Provider state management for Flutter";
  private generator: ProviderGenerator;

  constructor() {
    this.generator = new ProviderGenerator();
  }

  activate(context: vscode.ExtensionContext): void {
    // Plugin activation logic
    console.log("Provider plugin activated");
  }

  deactivate(): void {
    // Cleanup if needed
  }

  getCommands(): Command[] {
    return [
      {
        id: "flutter-broom.initProvider",
        title: "Broom: Initialize Provider Architecture",
        callback: this.initializeProject.bind(this),
      },
      {
        id: "flutter-broom.generateProviderFeature",
        title: "Broom: Generate Provider Feature",
        callback: this.generateFeature.bind(this),
      },
    ];
  }

  private async initializeProject() {
    const workspaceFolder = vscode.workspace.rootPath;
    if (!workspaceFolder) {
      vscode.window.showErrorMessage("No workspace folder found!");
      return;
    }

    try {
      this.generator.initializeProject(workspaceFolder);
      vscode.window.showInformationMessage(
        "Provider architecture initialized successfully!"
      );
    } catch (error) {
      vscode.window.showErrorMessage(
        `Error initializing Provider architecture: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  private async generateFeature() {
    const featureName = await vscode.window.showInputBox({
      placeHolder: "Enter feature name",
      prompt: "Generate a new feature with Provider",
    });

    if (!featureName) return;

    const workspaceFolder = vscode.workspace.rootPath;
    if (!workspaceFolder) {
      vscode.window.showErrorMessage("No workspace folder found!");
      return;
    }

    try {
      this.generator.generateFeature(workspaceFolder, featureName);
      vscode.window.showInformationMessage(
        `Feature '${featureName}' generated successfully!`
      );
    } catch (error) {
      vscode.window.showErrorMessage(
        `Error generating feature: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}
