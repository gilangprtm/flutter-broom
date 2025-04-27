import * as vscode from "vscode";
import { PluginRegistry } from "../../core/PluginRegistry";
import { CommandProvider } from "../../core/interfaces/CommandProvider";

/**
 * TreeView provider untuk menampilkan daftar semua perintah yang tersedia
 */
export class CommandsProvider implements vscode.TreeDataProvider<CommandItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    CommandItem | undefined | null | void
  > = new vscode.EventEmitter<CommandItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    CommandItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: CommandItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: CommandItem): Thenable<CommandItem[]> {
    return Promise.resolve(this.getAllCommands());
  }

  private getAllCommands(): CommandItem[] {
    const plugins = PluginRegistry.getAllPlugins();
    const allCommands: CommandItem[] = [];

    plugins.forEach((plugin) => {
      if ("getCommands" in plugin) {
        const commandProvider = plugin as unknown as CommandProvider;
        const commands = commandProvider.getCommands();

        commands.forEach((command) => {
          allCommands.push(
            new CommandItem(
              command.title,
              plugin.name, // Show plugin name in description
              command.id,
              {
                command: command.id,
                title: command.title,
              }
            )
          );
        });
      }
    });

    return allCommands;
  }
}

/**
 * Item perintah yang ditampilkan di TreeView
 */
export class CommandItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly pluginName: string,
    public readonly commandId: string,
    public readonly command: vscode.Command
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.tooltip = `${label} (${pluginName})`;
    this.description = pluginName;
    this.contextValue = "command";
    this.iconPath = new vscode.ThemeIcon("play");
  }
}
