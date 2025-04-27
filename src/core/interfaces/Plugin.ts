import * as vscode from "vscode";

export interface Plugin {
  id: string;
  name: string;
  description: string;
  activate(context: vscode.ExtensionContext): void;
  deactivate(): void;
}
