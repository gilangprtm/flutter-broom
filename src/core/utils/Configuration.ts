import * as vscode from "vscode";

export class Configuration {
  static readonly DEFAULT_CONFIG = {
    flutterProjectRoot: "lib",

    //data directory
    dataDirectory: "data",
    modelsDirectory: "models",
    datasourceDirectory: "datasource",
    networkDirectory: "network",
    dbDirectory: "db",
    repositoryDirectory: "repository",
    serviceDirectory: "service",

    //presentation directory
    presentationDirectory: "presentation",
    pagesDirectory: "pages",
    stateDirectory: "state",
    routesDirectory: "routes",

    //core directorie
    coreDirectory: "core",
    baseDirectory: "base",
    diDirectory: "injection",
    helperDirectory: "helper",
    mahasDirectory: "mahas",
    mahasInputDirectory: "input",
    mahasWidgetDirectory: "widget",
    coreServiceDirectory: "services",
    themeDirectory: "theme",
    utilsDirectory: "utils",
  };

  static getStateManagementConfig(type: string = "provider") {
    const configs: { [key: string]: { dirName: string; className: string } } = {
      provider: {
        dirName: "providers",
        className: "Provider",
      },
      riverpod: {
        dirName: "providers",
        className: "Provider",
      },
      bloc: {
        dirName: "blocs",
        className: "Bloc",
      },
      getx: {
        dirName: "controllers",
        className: "Controller",
      },
    };

    return configs[type] || configs["provider"];
  }

  static getConfig(): typeof Configuration.DEFAULT_CONFIG {
    // In the future, this could read from VS Code settings
    const config = vscode.workspace.getConfiguration("flutterBroom");

    return {
      flutterProjectRoot:
        (config.get("flutterProjectRoot") as string) ||
        this.DEFAULT_CONFIG.flutterProjectRoot,
      dataDirectory:
        (config.get("dataDirectory") as string) ||
        this.DEFAULT_CONFIG.dataDirectory,
      datasourceDirectory:
        (config.get("datasourceDirectory") as string) ||
        this.DEFAULT_CONFIG.datasourceDirectory,
      networkDirectory:
        (config.get("networkDirectory") as string) ||
        this.DEFAULT_CONFIG.networkDirectory,
      dbDirectory:
        (config.get("dbDirectory") as string) ||
        this.DEFAULT_CONFIG.dbDirectory,
      serviceDirectory:
        (config.get("serviceDirectory") as string) ||
        this.DEFAULT_CONFIG.serviceDirectory,
      presentationDirectory:
        (config.get("presentationDirectory") as string) ||
        this.DEFAULT_CONFIG.presentationDirectory,
      pagesDirectory:
        (config.get("pagesDirectory") as string) ||
        this.DEFAULT_CONFIG.pagesDirectory,
      stateDirectory:
        (config.get("stateDirectory") as string) ||
        this.DEFAULT_CONFIG.stateDirectory,
      routesDirectory:
        (config.get("routesDirectory") as string) ||
        this.DEFAULT_CONFIG.routesDirectory,
      coreDirectory:
        (config.get("coreDirectory") as string) ||
        this.DEFAULT_CONFIG.coreDirectory,
      helperDirectory:
        (config.get("helperDirectory") as string) ||
        this.DEFAULT_CONFIG.helperDirectory,
      mahasDirectory:
        (config.get("mahasDirectory") as string) ||
        this.DEFAULT_CONFIG.mahasDirectory,
      mahasInputDirectory:
        (config.get("mahasInputDirectory") as string) ||
        this.DEFAULT_CONFIG.mahasInputDirectory,
      mahasWidgetDirectory:
        (config.get("mahasWidgetDirectory") as string) ||
        this.DEFAULT_CONFIG.mahasWidgetDirectory,
      coreServiceDirectory:
        (config.get("coreServiceDirectory") as string) ||
        this.DEFAULT_CONFIG.coreServiceDirectory,
      themeDirectory:
        (config.get("themeDirectory") as string) ||
        this.DEFAULT_CONFIG.themeDirectory,
      utilsDirectory:
        (config.get("utilsDirectory") as string) ||
        this.DEFAULT_CONFIG.utilsDirectory,
      modelsDirectory:
        (config.get("modelsDirectory") as string) ||
        this.DEFAULT_CONFIG.modelsDirectory,
      repositoryDirectory:
        (config.get("repositoryDirectory") as string) ||
        this.DEFAULT_CONFIG.repositoryDirectory,
      baseDirectory:
        (config.get("baseDirectory") as string) ||
        this.DEFAULT_CONFIG.baseDirectory,
      diDirectory:
        (config.get("diDirectory") as string) ||
        this.DEFAULT_CONFIG.diDirectory,
    };
  }

  static getStateManagement(): string {
    const config = vscode.workspace.getConfiguration("flutterBroom");
    return (config.get("stateManagement") as string) || "provider";
  }

  static getStateFolder(): string {
    const stateManagement = this.getStateManagement();
    const stateConfig = this.getStateManagementConfig(stateManagement);
    return stateConfig.dirName;
  }

  static getStateClassName(): string {
    const stateManagement = this.getStateManagement();
    const stateConfig = this.getStateManagementConfig(stateManagement);
    return stateConfig.className;
  }
}
