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

  // Daftar widget yang tersedia
  private readonly WIDGET_TYPES = [
    {
      id: "accordion",
      label: "Accordion",
      description: "Collapsible content panels",
    },
    {
      id: "alert",
      label: "Alert",
      description: "Alert and notification dialogs",
    },
    { id: "avatar", label: "Avatar", description: "User profile avatars" },
    {
      id: "badge",
      label: "Badge",
      description: "Status indicators and counters",
    },
    {
      id: "bottomsheet",
      label: "Bottom Sheet",
      description: "Slide-up panels from bottom",
    },
    {
      id: "button",
      label: "Button",
      description: "Custom button implementations",
    },
    {
      id: "card",
      label: "Card",
      description: "Content containers with various styles",
    },
    { id: "grid", label: "Grid", description: "Grid layout components" },
    { id: "image", label: "Image", description: "Enhanced image components" },
    { id: "loader", label: "Loader", description: "Loading indicators" },
    {
      id: "menubar",
      label: "Menu Bar",
      description: "Navigation menu components",
    },
    {
      id: "responsive",
      label: "Responsive",
      description: "Responsive layout helpers",
    },
    {
      id: "searchbar",
      label: "Search Bar",
      description: "Search input components",
    },
    {
      id: "snackbar",
      label: "Snackbar",
      description: "Brief message notifications",
    },
    { id: "tab", label: "Tab", description: "Tab navigation components" },
    { id: "tile", label: "Tile", description: "List tile components" },
    { id: "toast", label: "Toast", description: "Toast message notifications" },
  ];

  // Daftar utility yang tersedia
  private readonly UTILS_TYPES = [
    {
      id: "format",
      label: "Format",
      description: "Format utils for text, dates, numbers",
    },
    {
      id: "mahas",
      label: "Mahas",
      description: "Mahas utils for app functionality",
    },
    { id: "type", label: "Type", description: "Type helper utils" },
  ];

  // Daftar input yang tersedia
  private readonly INPUT_TYPES = [
    {
      id: "text",
      label: "Text Input",
      description: "Text input form field",
    },
    {
      id: "checkbox",
      label: "Checkbox",
      description: "Checkbox input component",
    },
    {
      id: "radio",
      label: "Radio",
      description: "Radio button input component",
    },
    {
      id: "dropdown",
      label: "Dropdown",
      description: "Dropdown select input",
    },
    {
      id: "datetime",
      label: "Date Time",
      description: "Date and time picker input",
    },
    {
      id: "box",
      label: "Input Box",
      description: "Base input box component",
    },
  ];

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
        "Input",
        "Input components for forms",
        "input",
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
      case "input":
        return this.getInputItems();
      case "theme":
        return this.getThemeItems();
      case "utils":
        return this.getUtilsItems();
      default:
        return [];
    }
  }

  private getWidgetItems(): ComponentItem[] {
    const widgetItems = this.WIDGET_TYPES.map(
      (widget) =>
        new ComponentItem(
          widget.label,
          widget.description,
          `widget.${widget.id}`,
          vscode.TreeItemCollapsibleState.None,
          {
            command: "flutter-broom.generateWidgetComponent",
            title: `Generate ${widget.label} Widget`,
            arguments: [widget.id],
          }
        )
    );

    // Tambahkan opsi untuk generate semua widget
    widgetItems.push(
      new ComponentItem(
        "All Widgets",
        "Generate all widget components",
        "widget.all",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateWidgetComponent",
          title: "Generate All Widgets",
          arguments: ["all"],
        }
      )
    );

    return widgetItems;
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
    const utilsItems = this.UTILS_TYPES.map(
      (util) =>
        new ComponentItem(
          util.label,
          util.description,
          `utils.${util.id}`,
          vscode.TreeItemCollapsibleState.None,
          {
            command: "flutter-broom.generateUtilsComponent",
            title: `Generate ${util.label} Utils`,
            arguments: [util.id],
          }
        )
    );

    // Tambahkan opsi untuk generate semua utils
    utilsItems.push(
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
      )
    );

    return utilsItems;
  }

  private getInputItems(): ComponentItem[] {
    const inputItems = this.INPUT_TYPES.map(
      (input) =>
        new ComponentItem(
          input.label,
          input.description,
          `input.${input.id}`,
          vscode.TreeItemCollapsibleState.None,
          {
            command: "flutter-broom.generateInputComponent",
            title: `Generate ${input.label} Component`,
            arguments: [input.id],
          }
        )
    );

    // Tambahkan opsi untuk generate semua input
    inputItems.push(
      new ComponentItem(
        "All Inputs",
        "Generate all input components",
        "input.all",
        vscode.TreeItemCollapsibleState.None,
        {
          command: "flutter-broom.generateInputComponent",
          title: "Generate All Inputs",
          arguments: ["all"],
        }
      )
    );

    return inputItems;
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
    } else if (type.startsWith("input")) {
      this.iconPath = new vscode.ThemeIcon("keyboard");
    }
  }
}
