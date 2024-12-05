import { writeFileSync, mkdirSync, readFileSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { generateRouting } from "../commands/routingService";
import { generateMainDart } from "../commands/mainDart";
import { updatePubspecYaml } from "../commands/depedencyInit";
import { config } from "../utils/config";
import { generateFeature } from "./featureService";

// Fungsi utama untuk menjalankan kedua proses di atas
const initProvider = (workspaceFolder: string) => {
  updatePubspecYaml(workspaceFolder); // Update dependencies di pubspec.yaml
  generateMainDart(workspaceFolder); // Generate main.dart
  generateRouting(workspaceFolder); // Generate routing
  generateFeature(workspaceFolder, "home");
};

// Fungsi untuk memulai perintah ini di extension
export const executeInitProvider = (workspaceFolder: string) => {
  vscode.window.showInformationMessage("Initializing project with Provider...");
  initProvider(workspaceFolder);
  vscode.window.showInformationMessage(
    "Provider setup completed successfully!"
  );
};
