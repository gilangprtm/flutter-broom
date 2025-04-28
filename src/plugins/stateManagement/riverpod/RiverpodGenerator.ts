import * as path from "path";
import { StateManagementGenerator } from "../../../core/interfaces/StateManagementGenerator";
import { FileUtils } from "../../../core/utils/FileUtils";
import { NameFormatter } from "../../../core/utils/NameFormatter";
import { Configuration } from "../../../core/utils/Configuration";
import { TemplateUtils } from "../../../core/utils/TemplateUtils";
import { DirectoryStructureGenerator } from "../../../core/utils/DirectoryStructureGenerator";
import * as templates from "./templates/feature/index";
import * as appTemplates from "./templates/app/index";
import * as globalTemplates from "../../global/index";
import * as baseTemplates from "./templates/base/index";

export class RiverpodGenerator implements StateManagementGenerator {
  private config = Configuration.getConfig();
  private stateFolder = "riverpod";
  private directoryGenerator = new DirectoryStructureGenerator();

  initializeProject(workspaceFolder: string): void {
    // Create directory structure first
    this.directoryGenerator.createProjectFolderStructure(workspaceFolder);

    // Create riverpod specific directory
    const libPath = path.join(workspaceFolder, this.config.flutterProjectRoot);
    const riverpodDir = path.join(
      libPath,
      this.config.presentationDirectory,
      this.stateFolder
    );
    FileUtils.createDirectoryIfNotExists(riverpodDir);

    // Generate initial files
    this.updateDependencies(workspaceFolder);
    this.generateMainFile(workspaceFolder);
    this.generateRoutingFiles(workspaceFolder);
    this.generateService(workspaceFolder);
    this.generateHelperFiles(workspaceFolder);
    this.generateBaseFiles(workspaceFolder);

    // Generate home feature as default
    this.generateFeature(workspaceFolder, "home");
  }

  updateDependencies(workspaceFolder: string): void {
    const pubspecPath = path.join(workspaceFolder, "pubspec.yaml");
    const content = TemplateUtils.render(appTemplates.yamlTemplate, {});
    FileUtils.writeFile(pubspecPath, content);
    console.log("Dependencies updated successfully.");
  }

  generateMainFile(workspaceFolder: string): void {
    const mainFilePath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      "main.dart"
    );

    // Render the template with appropriate paths
    const renderedTemplate = TemplateUtils.render(
      appTemplates.mainTemplate,
      {}
    );

    FileUtils.writeFile(mainFilePath, renderedTemplate);
    console.log("main.dart generated successfully.");
  }

  generateRoutingFiles(workspaceFolder: string): void {
    const routesPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      "routes"
    );

    FileUtils.createDirectoryIfNotExists(routesPath);

    const appRoutesPath = path.join(routesPath, "app_routes.dart");
    const appRoutesProviderPath = path.join(
      routesPath,
      "app_routes_provider.dart"
    );

    FileUtils.writeFile(appRoutesPath, appTemplates.appRoutesTemplate);
    FileUtils.writeFile(
      appRoutesProviderPath,
      appTemplates.appRoutesProviderTemplate
    );

    console.log("Routing files generated successfully.");
  }

  generateService(workspaceFolder: string): void {
    const dioServicePath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.dataDirectory,
      this.config.datasourceDirectory,
      this.config.networkDirectory,
      this.config.dbDirectory,
      "dio_service.dart"
    );

    FileUtils.writeFile(dioServicePath, globalTemplates.dioServiceTemplate);
    console.log("API service generated successfully.");

    const httpServicePath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.dataDirectory,
      this.config.datasourceDirectory,
      this.config.networkDirectory,
      this.config.dbDirectory,
      "http_service.dart"
    );

    FileUtils.writeFile(httpServicePath, globalTemplates.httpServiceTemplate);
    console.log("HTTP service generated successfully.");

    const loggerServicePath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.coreDirectory,
      this.config.coreServiceDirectory,
      "logger_service.dart"
    );

    FileUtils.writeFile(
      loggerServicePath,
      globalTemplates.loggerServiceTemplate
    );
    console.log("Logger service generated successfully.");

    const performanceServicePath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.coreDirectory,
      this.config.coreServiceDirectory,
      "performance_service.dart"
    );

    FileUtils.writeFile(
      performanceServicePath,
      globalTemplates.performanceServiceTemplate
    );
    console.log("Performance service generated successfully.");
  }

  generateHelperFiles(workspaceFolder: string): void {
    const dialogHelperPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.coreDirectory,
      this.config.helperDirectory,
      "dialog_helper.dart"
    );

    FileUtils.writeFile(dialogHelperPath, globalTemplates.dialogHelperTemplate);
    console.log("Helper files generated successfully.");
  }

  generateBaseFiles(workspaceFolder: string): void {
    const baseNetworkPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.coreDirectory,
      this.config.baseDirectory,
      "base_network.dart"
    );

    FileUtils.writeFile(baseNetworkPath, baseTemplates.baseNetworkTemplate);
    console.log("Base network file generated successfully.");

    const baseStateNotifierPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.coreDirectory,
      this.config.baseDirectory,
      "base_state_notifier.dart"
    );

    FileUtils.writeFile(
      baseStateNotifierPath,
      baseTemplates.baseStateNotifierTemplate
    );
    console.log("Base state notifier file generated successfully.");
  }

  generateFeature(workspaceFolder: string, featureName: string): void {
    const pascalName = NameFormatter.toPascalCase(featureName);
    const camelName = NameFormatter.toCamelCase(featureName);

    // Create feature folder structure
    const featurePath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.pagesDirectory,
      featureName
    );
    FileUtils.createDirectoryIfNotExists(featurePath);

    this.generateStateFile(workspaceFolder, featureName, pascalName);
    this.generateNotifierFile(workspaceFolder, featureName, pascalName);
    this.generateProviderFile(workspaceFolder, featureName, pascalName);
    this.generatePageFile(workspaceFolder, featureName, pascalName, camelName);
    this.updateRoutingFiles(workspaceFolder, featureName, pascalName);

    console.log(`Feature '${featureName}' generated successfully.`);
  }

  private generateStateFile(
    workspaceFolder: string,
    featureName: string,
    pascalName: string
  ): void {
    const statePath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.pagesDirectory,
      featureName,
      `${featureName}_state.dart`
    );

    const content = TemplateUtils.render(templates.stateTemplate, {
      pascalName,
      featureName,
    });

    FileUtils.writeFile(statePath, content);
  }

  private generateNotifierFile(
    workspaceFolder: string,
    featureName: string,
    pascalName: string
  ): void {
    const notifierPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.pagesDirectory,
      featureName,
      `${featureName}_notifier.dart`
    );

    const content = TemplateUtils.render(templates.notifierTemplate, {
      pascalName,
      featureName,
    });

    FileUtils.writeFile(notifierPath, content);
  }

  private generateProviderFile(
    workspaceFolder: string,
    featureName: string,
    pascalName: string
  ): void {
    const providerPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.pagesDirectory,
      featureName,
      `${featureName}_provider.dart`
    );

    const content = TemplateUtils.render(templates.providerTemplate, {
      pascalName,
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

    // Create a basic page template for riverpod
    const pageTemplate = `
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '${featureName}_provider.dart';

class ${pascalName}Page extends ConsumerWidget {
  const ${pascalName}Page({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(${pascalName}Provider);
    
    return Scaffold(
      appBar: AppBar(
        title: Text('${pascalName}'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Counter: \${state.counter}'),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => ref.read(${pascalName}Provider.notifier).incrementCounter(),
              child: const Text('Increment'),
            ),
          ],
        ),
      ),
    );
  }
}`;

    FileUtils.writeFile(pagePath, pageTemplate);
  }

  private updateRoutingFiles(
    workspaceFolder: string,
    featureName: string,
    pascalName: string
  ): void {
    const appRoutesPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.routesDirectory,
      "app_routes.dart"
    );

    const appRoutesProviderPath = path.join(
      workspaceFolder,
      this.config.flutterProjectRoot,
      this.config.presentationDirectory,
      this.config.routesDirectory,
      "app_routes_provider.dart"
    );

    // Read existing files
    const appRoutesContent = FileUtils.readFile(appRoutesPath);
    const appRoutesProviderContent = FileUtils.readFile(appRoutesProviderPath);

    // Add new route constant
    const newAppRoutesContent = appRoutesContent.replace(
      "class AppRoutes {",
      `class AppRoutes {
  static const ${featureName} = '/${featureName}';`
    );

    // Add new route mapping
    const newAppRoutesProviderContent = appRoutesProviderContent.replace(
      "return {",
      `return {
      AppRoutes.${featureName}: (context) => const ${pascalName}Page(),`
    );

    // Add import for the page
    const importStatement = `import 'app_routes.dart';
import '../pages/${featureName}/${featureName}_page.dart';`;

    const newAppRoutesProviderWithImport = appRoutesProviderContent.includes(
      `import '../pages/${featureName}/${featureName}_page.dart'`
    )
      ? newAppRoutesProviderContent
      : newAppRoutesProviderContent.replace(
          "import 'app_routes.dart';",
          importStatement
        );

    // Write updated content back to files
    FileUtils.writeFile(appRoutesPath, newAppRoutesContent);
    FileUtils.writeFile(appRoutesProviderPath, newAppRoutesProviderWithImport);
  }

  generate(workspaceFolder: string, options?: any): void {
    if (options && options.featureName) {
      this.generateFeature(workspaceFolder, options.featureName);
    } else {
      this.initializeProject(workspaceFolder);
    }
  }
}
