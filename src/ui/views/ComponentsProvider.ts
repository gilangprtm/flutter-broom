import * as vscode from "vscode";

/**
 * TreeView provider untuk menampilkan daftar komponen
 */
export class ComponentsProvider
  implements vscode.TreeDataProvider<ComponentItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    ComponentItem | undefined | null | void
  > = new vscode.EventEmitter<ComponentItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    ComponentItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: ComponentItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ComponentItem): Thenable<ComponentItem[]> {
    if (element) {
      return Promise.resolve(this.getSubComponentItems(element.type));
    } else {
      return Promise.resolve(this.getMainComponentItems());
    }
  }

  private getMainComponentItems(): ComponentItem[] {
    return [
      new ComponentItem(
        "Widget",
        "UI widgets for Flutter",
        "widget",
        vscode.TreeItemCollapsibleState.Collapsed
      ),
      new ComponentItem(
        "Theme",
        "Theming components for Flutter",
        "theme",
        vscode.TreeItemCollapsibleState.Collapsed
      ),
      new ComponentItem(
        "Utils",
        "Utils components for Flutter",
        "utils",
        vscode.TreeItemCollapsibleState.Collapsed
      ),
    ];
  }

  private getSubComponentItems(type: string): ComponentItem[] {
    switch (type) {
      case "widget":
        return this.getWidgetItems();
      case "theme":
        return this.getThemeItems();
      case "utils":
        return this.getUtilsItems();
      default:
        return [];
    }
  }

  private getWidgetItems(): ComponentItem[] {
    return [
      new ComponentItem(
        "Button",
        "Custom button implementations",
        "widget.button",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateWidgetComponent",
          title: "Generate Button Widget",
          arguments: ["button"],
        }
      ),
      new ComponentItem(
        "Card",
        "Custom card implementations",
        "widget.card",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateWidgetComponent",
          title: "Generate Card Widget",
          arguments: ["card"],
        }
      ),
      new ComponentItem(
        "Input",
        "Custom input fields",
        "widget.input",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateWidgetComponent",
          title: "Generate Input Widget",
          arguments: ["input"],
        }
      ),
    ];
  }

  private getThemeItems(): ComponentItem[] {
    return [
      new ComponentItem(
        "Colors",
        "Application color schemes",
        "theme.colors",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateThemeComponent",
          title: "Generate Color Theme",
          arguments: ["colors"],
        }
      ),
      new ComponentItem(
        "Typography",
        "Text styles for application",
        "theme.typography",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateThemeComponent",
          title: "Generate Typography Theme",
          arguments: ["typography"],
        }
      ),
      new ComponentItem(
        "Complete Theme",
        "Full theme implementation",
        "theme.complete",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateThemeComponent",
          title: "Generate Complete Theme",
          arguments: ["complete"],
        }
      ),
    ];
  }

  private getUtilsItems(): ComponentItem[] {
    return [
      new ComponentItem(
        "Format",
        "Format utils",
        "utils.format",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateUtilsComponent",
          title: "Generate Format Utils",
          arguments: ["format"],
        }
      ),
      new ComponentItem(
        "Mahas",
        "Mahas utils",
        "utils.mahas",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateUtilsComponent",
          title: "Generate Mahas Utils",
          arguments: ["mahas"],
        }
      ),
      new ComponentItem(
        "Type",
        "Type utils",
        "utils.type",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateUtilsComponent",
          title: "Generate Type Utils",
          arguments: ["type"],
        }
      ),
      new ComponentItem(
        "All Utils",
        "Generate all utils components",
        "utils.all",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateUtilsComponent",
          title: "Generate All Utils",
          arguments: ["all"],
        }
      ),
    ];
  }
}

/**
 * Item yang ditampilkan di TreeView
 */
export class ComponentItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly description: string,
    public readonly type: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.tooltip = description;
    this.description = description;
    this.contextValue = command ? "component-item" : "component-category";

    // Set icon based on type
    if (type.startsWith("widget")) {
      this.iconPath = new vscode.ThemeIcon("layout");
    } else if (type.startsWith("theme")) {
      this.iconPath = new vscode.ThemeIcon("paintcan");
    } else if (type.startsWith("utils")) {
      this.iconPath = new vscode.ThemeIcon("tools");
    }
  }
}
