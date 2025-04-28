import * as vscode from "vscode";
import { PluginRegistry } from "./core/PluginRegistry";
import { CommandProvider } from "./core/interfaces/CommandProvider";
import { ProviderPlugin } from "./plugins/stateManagement/provider/ProviderPlugin";
import { RiverpodPlugin } from "./plugins/stateManagement/riverpod/RiverpodPlugin";
import { PluginsProvider } from "./ui/views/PluginsProvider";
import { CommandsProvider } from "./ui/views/CommandsProvider";
import { ComponentsProvider } from "./ui/views/ComponentsProvider";
import { ComponentGenerator } from "./components/ComponentGenerator";

export function activate(context: vscode.ExtensionContext) {
  console.log("Flutter Broom extension is now active!");

  // Register all plugins
  const plugins = [
    new ProviderPlugin(),
    new RiverpodPlugin(),
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
  const componentsProvider = new ComponentsProvider();

  vscode.window.registerTreeDataProvider(
    "flutterBroomPlugins",
    pluginsProvider
  );

  vscode.window.registerTreeDataProvider(
    "flutterBroomCommands",
    commandsProvider
  );

  vscode.window.registerTreeDataProvider(
    "flutterBroomComponents",
    componentsProvider
  );

  // Create component generator
  const componentGenerator = new ComponentGenerator();

  // Register refresh command
  context.subscriptions.push(
    vscode.commands.registerCommand("flutter-broom.refreshPlugins", () => {
      pluginsProvider.refresh();
      commandsProvider.refresh();
      componentsProvider.refresh();
    })
  );

  // Register component generation commands
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "flutter-broom.generateWidgetComponent",
      async (type: string) => {
        const workspaceFolder = vscode.workspace.rootPath;
        if (!workspaceFolder) {
          vscode.window.showErrorMessage("No workspace folder found!");
          return;
        }

        await componentGenerator.generateWidgetComponent(workspaceFolder, type);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "flutter-broom.generateThemeComponent",
      async (type: string) => {
        const workspaceFolder = vscode.workspace.rootPath;
        if (!workspaceFolder) {
          vscode.window.showErrorMessage("No workspace folder found!");
          return;
        }

        await componentGenerator.generateThemeComponent(workspaceFolder, type);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "flutter-broom.generateUtilsComponent",
      async (type: string) => {
        const workspaceFolder = vscode.workspace.rootPath;
        if (!workspaceFolder) {
          vscode.window.showErrorMessage("No workspace folder found!");
          return;
        }

        await componentGenerator.generateUtilsComponent(workspaceFolder, type);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "flutter-broom.generateInputComponent",
      async (type: string) => {
        const workspaceFolder = vscode.workspace.rootPath;
        if (!workspaceFolder) {
          vscode.window.showErrorMessage("No workspace folder found!");
          return;
        }

        await componentGenerator.generateInputComponent(workspaceFolder, type);
      }
    )
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
