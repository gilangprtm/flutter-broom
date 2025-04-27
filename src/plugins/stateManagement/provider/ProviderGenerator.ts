import * as path from "path";
import { StateManagementGenerator } from "../../../core/interfaces/StateManagementGenerator";
import { FileUtils } from "../../../core/utils/FileUtils";
import { NameFormatter } from "../../../core/utils/NameFormatter";
import { Configuration } from "../../../core/utils/Configuration";
import { TemplateUtils } from "../../../core/utils/TemplateUtils";
import * as templates from "./templates";

export class ProviderGenerator implements StateManagementGenerator {
  private config = Configuration.getConfig();

  initializeProject(workspaceFolder: string): void {
    this.updateDependencies(workspaceFolder);
    this.generateMainFile(workspaceFolder);
    this.generateRoutingFiles(workspaceFolder);
    this.generateApiService(workspaceFolder);
    this.generateHelperFiles(workspaceFolder);
    // Generate home feature as default
    this.generateFeature(workspaceFolder, "home");
  }

  updateDependencies(workspaceFolder: string): void {
    const pubspecPath = path.join(workspaceFolder, "pubspec.yaml");

    if (!FileUtils.fileExists(pubspecPath)) {
      console.error("pubspec.yaml not found!");
      return;
    }

    let content = FileUtils.readFile(pubspecPath);

    // Remove comments or sections that start with '#'
    content = content
      .split("\n")
      .filter((line) => !line.trim().startsWith("#"))
      .join("\n");

    // Check if all required dependencies are already included
    if (
      !content.includes("provider:") ||
      !content.includes("flutter_easyloading:") ||
      !content.includes("dio:") ||
      !content.includes("pretty_dio_logger:")
    ) {
      // Find the dependencies section and add new dependencies after it
      const dependenciesIndex =
        content.indexOf("dependencies:") + "dependencies:".length;
      const beforeDependencies = content.slice(0, dependenciesIndex);
      const afterDependencies = content.slice(dependenciesIndex);

      // Add new dependencies after the existing dependencies section
      content =
        beforeDependencies + templates.dependenciesTemplate + afterDependencies;

      // Save changes to pubspec.yaml
      FileUtils.writeFile(pubspecPath, content);

      console.log("pubspec.yaml updated with required dependencies.");
    } else {
      console.log("Dependencies already up to date in pubspec.yaml.");
    }
  }

  generateMainFile(workspaceFolder: string): void {
    const mainFilePath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      "main.dart"
    );

    FileUtils.writeFile(mainFilePath, templates.mainTemplate);
    console.log("main.dart generated successfully.");
  }

  generateRoutingFiles(workspaceFolder: string): void {
    // Create app_routes.dart
    const appRoutesPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.routesDirectory,
      "app_routes.dart"
    );
    FileUtils.writeFile(appRoutesPath, templates.appRoutesTemplate);

    // Create app_routes_provider.dart
    const appRoutesProviderPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.routesDirectory,
      "app_routes_provider.dart"
    );
    FileUtils.writeFile(
      appRoutesProviderPath,
      templates.appRoutesProviderTemplate
    );

    // Create app_providers.dart
    const appProvidersPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.routesDirectory,
      "app_providers.dart"
    );
    FileUtils.writeFile(appProvidersPath, templates.appProvidersTemplate);

    console.log("Routing files generated successfully.");
  }

  generateApiService(workspaceFolder: string): void {
    const dioServicePath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.dataDirectory,
      this.config.datasourceDirectory,
      this.config.networkDirectory,
      this.config.dbDirectory,
      "dio_service.dart"
    );

    FileUtils.writeFile(dioServicePath, templates.dioServiceTemplate);
    console.log("API service generated successfully.");
  }

  generateHelperFiles(workspaceFolder: string): void {
    const dialogHelperPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.coreDirectory,
      this.config.helperDirectory,
      "dialog_helper.dart"
    );

    FileUtils.writeFile(dialogHelperPath, templates.dialogHelperTemplate);
    console.log("Helper files generated successfully.");
  }

  generateFeature(workspaceFolder: string, featureName: string): void {
    const pascalName = NameFormatter.toPascalCase(featureName);
    const camelName = NameFormatter.toCamelCase(featureName);

    this.generateServiceFile(workspaceFolder, featureName, pascalName);
    this.generateProviderFile(
      workspaceFolder,
      featureName,
      pascalName,
      camelName
    );
    this.generatePageFile(workspaceFolder, featureName, pascalName, camelName);
    this.updateRoutingFiles(
      workspaceFolder,
      featureName,
      pascalName,
      camelName
    );

    console.log(`Feature '${featureName}' generated successfully.`);
  }

  private generateServiceFile(
    workspaceFolder: string,
    featureName: string,
    pascalName: string
  ): void {
    const servicePath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.dataDirectory,
      this.config.datasourceDirectory,
      this.config.networkDirectory,
      this.config.serviceDirectory,
      `${featureName}_service.dart`
    );

    const content = TemplateUtils.render(templates.serviceTemplate, {
      pascalName,
    });

    FileUtils.writeFile(servicePath, content);
  }

  private generateProviderFile(
    workspaceFolder: string,
    featureName: string,
    pascalName: string,
    camelName: string
  ): void {
    const providerPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.providersDirectory,
      `${featureName}_provider.dart`
    );

    const content = TemplateUtils.render(templates.providerTemplate, {
      pascalName,
      camelName,
      featureName,
    });

    FileUtils.writeFile(providerPath, content);
  }

  private generatePageFile(
    workspaceFolder: string,
    featureName: string,
    pascalName: string,
    camelName: string
  ): void {
    const pagePath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.pagesDirectory,
      featureName,
      `${featureName}_page.dart`
    );

    const content = TemplateUtils.render(templates.pageTemplate, {
      pascalName,
      featureName,
    });

    FileUtils.writeFile(pagePath, content);
  }

  private updateRoutingFiles(
    workspaceFolder: string,
    featureName: string,
    pascalName: string,
    camelName: string
  ): void {
    // Update app_routes.dart
    const appRoutesPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.routesDirectory,
      "app_routes.dart"
    );

    if (FileUtils.fileExists(appRoutesPath)) {
      let content = FileUtils.readFile(appRoutesPath);
      const newRoute = `  static const String ${camelName} = '/${featureName}';`;

      // Check if route already exists
      if (!content.includes(newRoute)) {
        content = content.replace(
          /class AppRoutes \{([\s\S]*?)\}/,
          (match, p1) => `class AppRoutes {\n${p1}  ${newRoute}\n}`
        );

        FileUtils.writeFile(appRoutesPath, content);
      }
    }

    // Update app_routes_provider.dart
    const appRoutesProviderPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.routesDirectory,
      "app_routes_provider.dart"
    );

    if (FileUtils.fileExists(appRoutesProviderPath)) {
      let content = FileUtils.readFile(appRoutesProviderPath);
      const newRouteProvider = `      AppRoutes.${camelName}: (context) => const ${pascalName}Page(),`;
      const newImport = `import '../pages/${featureName}/${featureName}_page.dart';`;

      // Add import if not exists
      if (!content.includes(newImport)) {
        content = newImport + "\n" + content;
      }

      // Add route if not exists
      if (!content.includes(newRouteProvider)) {
        content = content.replace(
          /return \{([\s\S]*?)\};/,
          (match, p1) => `return {\n${p1}${newRouteProvider}\n    };`
        );

        FileUtils.writeFile(appRoutesProviderPath, content);
      }
    }

    // Update app_providers.dart
    const appProvidersPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.routesDirectory,
      "app_providers.dart"
    );

    if (FileUtils.fileExists(appProvidersPath)) {
      let content = FileUtils.readFile(appProvidersPath);
      const newProvider = `      ChangeNotifierProvider(create: (_) => ${pascalName}Provider()),`;
      const newImport = `import '../providers/${featureName}_provider.dart';`;

      // Add import if not exists
      if (!content.includes(newImport)) {
        content = newImport + "\n" + content;
      }

      // Add provider if not exists
      if (!content.includes(newProvider)) {
        content = content.replace(
          /return \[([\s\S]*?)\];/,
          (match, p1) => `return [\n${p1}${newProvider}\n    ];`
        );

        FileUtils.writeFile(appProvidersPath, content);
      }
    }
  }

  generate(workspaceFolder: string, options?: any): void {
    if (options && options.featureName) {
      this.generateFeature(workspaceFolder, options.featureName);
    } else {
      this.initializeProject(workspaceFolder);
    }
  }
}
