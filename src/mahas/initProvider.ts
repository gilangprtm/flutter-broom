import * as vscode from "vscode";
import { generateRouting } from "./routingService";
import { generateMainDart } from "./mainDart";
import { updatePubspecYaml } from "./depedencyInit";
import { generateFeature } from "./featureService";
import { generateApi } from "./apiService";
import { generateHelper } from "./helperService";

// Fungsi utama untuk menjalankan kedua proses di atas
const initProvider = (workspaceFolder: string) => {
  updatePubspecYaml(workspaceFolder); // Update dependencies di pubspec.yaml
  generateMainDart(workspaceFolder); // Generate main.dart
  generateRouting(workspaceFolder); // Generate routing
  generateApi(workspaceFolder); // Generate api service
  generateHelper(workspaceFolder); // Generate api service
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
