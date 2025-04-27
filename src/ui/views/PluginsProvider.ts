import * as vscode from "vscode";
import { PluginRegistry } from "../../core/PluginRegistry";
import { CommandProvider } from "../../core/interfaces/CommandProvider";

/**
 * TreeView provider untuk menampilkan daftar plugin
 */
export class PluginsProvider implements vscode.TreeDataProvider<PluginItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    PluginItem | undefined | null | void
  > = new vscode.EventEmitter<PluginItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    PluginItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: PluginItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: PluginItem): Thenable<PluginItem[]> {
    if (element) {
      return Promise.resolve(this.getCommandsForPlugin(element.pluginId));
    } else {
      return Promise.resolve(this.getPlugins());
    }
  }

  private getPlugins(): PluginItem[] {
    const plugins = PluginRegistry.getAllPlugins();
    return plugins.map(
      (plugin) =>
        new PluginItem(
          plugin.name,
          plugin.description,
          plugin.id,
          vscode.TreeItemCollapsibleState.Collapsed
        )
    );
  }

  private getCommandsForPlugin(pluginId: string): PluginItem[] {
    const plugin = PluginRegistry.getPlugin(pluginId);
    if (!plugin || !("getCommands" in plugin)) {
      return [];
    }

    const commandProvider = plugin as unknown as CommandProvider;
    const commands = commandProvider.getCommands();

    return commands.map(
      (command) =>
        new PluginItem(
          command.title,
          `Command: ${command.id}`,
          pluginId,
          vscode.TreeItemCollapsibleState.None,
          {
            command: command.id,
            title: command.title,
          }
        )
    );
  }
}

/**
 * Item yang ditampilkan di TreeView
 */
export class PluginItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly description: string,
    public readonly pluginId: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.tooltip = description;
    this.description = description;
    this.contextValue = command ? "command" : "plugin";

    // Set icon based on type
    if (!command) {
      this.iconPath = new vscode.ThemeIcon("extensions");
    } else {
      this.iconPath = new vscode.ThemeIcon("zap");
    }
  }
}
