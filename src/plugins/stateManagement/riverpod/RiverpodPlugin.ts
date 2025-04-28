import * as vscode from "vscode";
import { Plugin } from "../../../core/interfaces/Plugin";
import {
  CommandProvider,
  Command,
} from "../../../core/interfaces/CommandProvider";
import { RiverpodGenerator } from "./RiverpodGenerator";

export class RiverpodPlugin implements Plugin, CommandProvider {
  id = "riverpod";
  name = "Riverpod";
  description = "Riverpod state management for Flutter";
  private generator: RiverpodGenerator;

  constructor() {
    this.generator = new RiverpodGenerator();
  }

  activate(context: vscode.ExtensionContext): void {
    // Plugin activation logic
    console.log("Riverpod plugin activated");
  }

  deactivate(): void {
    // Cleanup if needed
  }

  getCommands(): Command[] {
    return [
      {
        id: "flutter-broom.initRiverpod",
        title: "Broom: Initialize Riverpod Architecture",
        callback: this.initializeProject.bind(this),
      },
      {
        id: "flutter-broom.generateRiverpodFeature",
        title: "Broom: Generate Riverpod Feature",
        callback: this.generateFeature.bind(this),
      },
    ];
  }

  private async initializeProject(): Promise<void> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage(
        "No workspace folder open. Please open a Flutter project."
      );
      return;
    }

    const workspaceFolder = workspaceFolders[0].uri.fsPath;
    this.generator.initializeProject(workspaceFolder);
    vscode.window.showInformationMessage(
      "Riverpod architecture initialized successfully!"
    );
  }

  private async generateFeature(): Promise<void> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage(
        "No workspace folder open. Please open a Flutter project."
      );
      return;
    }

    const featureName = await vscode.window.showInputBox({
      prompt: "Enter the feature name (e.g., login, settings, profile)",
      placeHolder: "Feature name",
      validateInput: (value: string) => {
        if (!value) {
          return "Feature name cannot be empty";
        }
        if (!/^[a-z][a-z0-9_]*$/.test(value)) {
          return "Feature name should be snake_case, starting with a lowercase letter";
        }
        return null;
      },
    });

    if (!featureName) {
      return; // User cancelled
    }

    const workspaceFolder = workspaceFolders[0].uri.fsPath;
    this.generator.generateFeature(workspaceFolder, featureName);
    vscode.window.showInformationMessage(
      `Riverpod feature '${featureName}' generated successfully!`
    );
  }
}
