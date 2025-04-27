export interface Generator {
  generate(workspaceFolder: string, options?: any): void;
}
