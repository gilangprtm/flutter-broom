import * as vscode from "vscode";
import { PluginRegistry } from "./core/PluginRegistry";
import { CommandProvider } from "./core/interfaces/CommandProvider";
import { ProviderPlugin } from "./plugins/stateManagement/provider/ProviderPlugin";
import { PluginsProvider } from "./ui/views/PluginsProvider";
import { CommandsProvider } from "./ui/views/CommandsProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log("Flutter Broom extension is now active!");

  // Register all plugins
  const plugins = [
    new ProviderPlugin(),
    // Additional plugins will be added here in the future
  ];

  // Register each plugin and its commands
  plugins.forEach((plugin) => {
    PluginRegistry.register(plugin);
    plugin.activate(context);

    // Register commands from plugins that implement CommandProvider
    if ("getCommands" in plugin) {
      const commandProvider = plugin as unknown as CommandProvider;
      commandProvider.getCommands().forEach((cmd) => {
        const disposable = vscode.commands.registerCommand(
          cmd.id,
          cmd.callback
        );
        context.subscriptions.push(disposable);
      });
    }
  });

  // Setup sidebar tree views
  const pluginsProvider = new PluginsProvider();
  const commandsProvider = new CommandsProvider();

  vscode.window.registerTreeDataProvider(
    "flutterBroomPlugins",
    pluginsProvider
  );

  vscode.window.registerTreeDataProvider(
    "flutterBroomCommands",
    commandsProvider
  );

  // Register refresh command
  context.subscriptions.push(
    vscode.commands.registerCommand("flutter-broom.refreshPlugins", () => {
      pluginsProvider.refresh();
      commandsProvider.refresh();
    })
  );

  // Register plugin selection command
  const selectPluginCommand = vscode.commands.registerCommand(
    "flutter-broom.selectPlugin",
    async () => {
      const allPlugins = PluginRegistry.getAllPlugins();
      const selection = await vscode.window.showQuickPick(
        allPlugins.map((p) => ({
          label: p.name,
          description: p.description,
          id: p.id,
        })),
        { placeHolder: "Select plugin" }
      );

      if (selection) {
        const plugin = PluginRegistry.getPlugin(selection.id);
        if (plugin && "getCommands" in plugin) {
          const commandProvider = plugin as unknown as CommandProvider;
          const commands = commandProvider.getCommands();

          const commandSelection = await vscode.window.showQuickPick(
            commands.map((c) => ({
              label: c.title,
              id: c.id,
            })),
            { placeHolder: "Select command to execute" }
          );

          if (commandSelection) {
            vscode.commands.executeCommand(commandSelection.id);
          }
        }
      }
    }
  );

  context.subscriptions.push(selectPluginCommand);
}

export function deactivate() {
  // Deactivate all plugins
  PluginRegistry.getAllPlugins().forEach((plugin) => plugin.deactivate());
}
