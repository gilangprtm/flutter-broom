import { Generator } from "./Generator";

export interface StateManagementGenerator extends Generator {
  initializeProject(workspaceFolder: string): void;
  generateFeature(workspaceFolder: string, featureName: string): void;
  updateDependencies(workspaceFolder: string): void;
}
