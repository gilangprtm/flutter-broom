import * as vscode from "vscode";

export class Configuration {
  static readonly DEFAULT_CONFIG = {
    flutterProjectRoot: "lib",
    dataDirectory: "data",
    datasourceDirectory: "datasource",
    networkDirectory: "network",
    dbDirectory: "db",
    serviceDirectory: "service",
    presentationDirectory: "presentation",
    pagesDirectory: "pages",
    providersDirectory: "providers",
    routesDirectory: "routes",
    coreDirectory: "core",
    helperDirectory: "helper",
  };

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
      providersDirectory:
        (config.get("providersDirectory") as string) ||
        this.DEFAULT_CONFIG.providersDirectory,
      routesDirectory:
        (config.get("routesDirectory") as string) ||
        this.DEFAULT_CONFIG.routesDirectory,
      coreDirectory:
        (config.get("coreDirectory") as string) ||
        this.DEFAULT_CONFIG.coreDirectory,
      helperDirectory:
        (config.get("helperDirectory") as string) ||
        this.DEFAULT_CONFIG.helperDirectory,
    };
  }

  static getStateManagement(): string {
    const config = vscode.workspace.getConfiguration("flutterBroom");
    return (config.get("stateManagement") as string) || "provider";
  }
}
