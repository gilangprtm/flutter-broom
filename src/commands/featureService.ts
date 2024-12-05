import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { config } from "../utils/config";

export function generateFeature(workspaceFolder: string, featureName: string) {
  const camelCaseName = featureName[0].toLowerCase() + featureName.slice(1);
  const pascalCaseName = featureName[0].toUpperCase() + featureName.slice(1);

  // Paths
  const basePath = path.join(workspaceFolder, config.flutterProjectRoot);

  // 1. Generate Files
  generateServiceFile(basePath, pascalCaseName, camelCaseName);
  generateProviderFile(basePath, pascalCaseName, camelCaseName);
  generatePageFile(basePath, pascalCaseName, camelCaseName);

  // 2. Update Routing Files
  updateAppRoutes(basePath, pascalCaseName, camelCaseName);
  updateAppRoutesProvider(basePath, pascalCaseName, camelCaseName);
  updateAppProviders(basePath, pascalCaseName);

  vscode.window.showInformationMessage(
    `Feature "${pascalCaseName}" created successfully.`
  );
}

// generate service
function generateServiceFile(
  basePath: string,
  pascalCaseName: string,
  camelCaseName: string
) {
  const servicePath = path.join(
    basePath,
    config.dataDirectory,
    config.datasourceDirectory,
    config.networkDirectory,
    config.serviceDirectory,
    `${camelCaseName}_service.dart`
  );
  const content = `
  class ${pascalCaseName}Service {
    Future<void> fetch${pascalCaseName}Data() async {}
  }
    `;
  writeFile(servicePath, content);
}

// generate provider
function generateProviderFile(
  basePath: string,
  pascalCaseName: string,
  camelCaseName: string
) {
  const providerPath = path.join(
    basePath,
    config.presentationDirectory,
    config.providersDirectory,
    `${camelCaseName}_provider.dart`
  );
  const content = `
  import 'package:flutter/material.dart';
  
  class ${pascalCaseName}Provider with ChangeNotifier {
    int _count = 0;
  
    int get count => _count;
  
    void incrementCount() {
      _count++;
      notifyListeners();
    }
  }
    `;
  writeFile(providerPath, content);
}

// generate page
function generatePageFile(
  basePath: string,
  pascalCaseName: string,
  camelCaseName: string
) {
  const pagePath = path.join(
    basePath,
    config.presentationDirectory,
    config.pagesDirectory,
    camelCaseName,
    `${camelCaseName}_page.dart`
  );
  const content = `
  import 'package:flutter/material.dart';
  import 'package:provider/provider.dart';
  
  import '../../providers/${camelCaseName}_provider.dart';
  
  class ${pascalCaseName}Page extends StatelessWidget {
    const ${pascalCaseName}Page({super.key});
  
    @override
    Widget build(BuildContext context) {
      final provider = Provider.of<${pascalCaseName}Provider>(context);
  
      return Scaffold(
        appBar: AppBar(
          title: const Text("${pascalCaseName} Page"),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Count: \${provider.count}', style: const TextStyle(fontSize: 24)),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: provider.incrementCount,
                child: const Text('Increment Count'),
              ),
            ],
          ),
        ),
      );
    }
  }
    `;
  writeFile(pagePath, content);
}

// update routing
function updateAppRoutes(
  basePath: string,
  pascalCaseName: string,
  camelCaseName: string
) {
  const routesPath = path.join(
    basePath,
    config.presentationDirectory,
    config.routesDirectory,
    "app_routes.dart"
  );

  const newRoute = `  static const String ${camelCaseName} = '/${camelCaseName}';\n`;
  let content = "";

  if (fs.existsSync(routesPath)) {
    content = fs.readFileSync(routesPath, "utf-8");

    // Periksa apakah rute sudah ada
    if (content.includes(newRoute.trim())) {
      return;
    }

    // Tambahkan rute baru di akhir class
    content = content.replace(
      /class AppRoutes \{([\s\S]*?)\}/,
      (match, p1) => `class AppRoutes {\n${p1}${newRoute}}`
    );
  } else {
    // Buat file baru jika belum ada
    content = `class AppRoutes {\n${newRoute}}`;
  }

  fs.writeFileSync(routesPath, content, { flag: "w" });
}

function updateAppRoutesProvider(
  basePath: string,
  pascalCaseName: string,
  camelCaseName: string
) {
  const routesProviderPath = path.join(
    basePath,
    config.presentationDirectory,
    config.routesDirectory,
    "app_routes_provider.dart"
  );

  const newRouteProvider = `      AppRoutes.${camelCaseName}: (context) => const ${pascalCaseName}Page(),\n`;
  const newImport = `import '../pages/${camelCaseName}/${camelCaseName}_page.dart';\n`;

  let content = "";

  if (fs.existsSync(routesProviderPath)) {
    content = fs.readFileSync(routesProviderPath, "utf-8");

    // Tambahkan import baru jika belum ada
    if (!content.includes(newImport.trim())) {
      content = newImport + content;
    }

    // Tambahkan rute baru ke dalam Map
    if (!content.includes(newRouteProvider.trim())) {
      content = content.replace(
        /static Map<String, WidgetBuilder> getRoutes\(\) \{\s*return \{\s*([\s\S]*?)\s*\};/,
        (match, p1) =>
          `static Map<String, WidgetBuilder> getRoutes() {\n    return {\n${p1}${newRouteProvider}    };`
      );
    }
  } else {
    // Buat file baru jika belum ada
    content = `${newImport}
  class AppRoutesProvider {
    static Map<String, WidgetBuilder> getRoutes() {
      return {
        ${newRouteProvider.trim()}
      };
    }
  }`;
  }

  fs.writeFileSync(routesProviderPath, content, { flag: "w" });
}

function updateAppProviders(basePath: string, pascalCaseName: string) {
  const providersPath = path.join(
    basePath,
    config.presentationDirectory,
    config.routesDirectory,
    "app_providers.dart"
  );

  const newProvider = `      ChangeNotifierProvider(create: (_) => ${pascalCaseName}Provider()),\n`;
  const newImport = `import '../providers/${pascalCaseName.toLowerCase()}_provider.dart';\n`;

  let content = "";

  if (fs.existsSync(providersPath)) {
    content = fs.readFileSync(providersPath, "utf-8");

    // Tambahkan import baru jika belum ada
    if (!content.includes(newImport.trim())) {
      content = newImport + content;
    }

    // Tambahkan provider baru ke dalam list
    if (!content.includes(newProvider.trim())) {
      content = content.replace(
        /static List<SingleChildWidget> getProviders\(\) \{\s*return \[\s*([\s\S]*?)\s*\];/,
        (match, p1) =>
          `static List<SingleChildWidget> getProviders() {\n    return [\n${p1}${newProvider}    ];`
      );
    }
  } else {
    // Buat file baru jika belum ada
    content = `${newImport}
  import 'package:provider/provider.dart';
  import 'package:provider/single_child_widget.dart';
  
  class AppProviders {
    static List<SingleChildWidget> getProviders() {
      return [
        ${newProvider.trim()}
      ];
    }
  }`;
  }

  fs.writeFileSync(providersPath, content, { flag: "w" });
}

function writeFile(filePath: string, content: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, { flag: "w" });
}

function appendToFile(filePath: string, content: string) {
  if (fs.existsSync(filePath)) {
    const existingContent = fs.readFileSync(filePath, "utf-8");
    if (!existingContent.includes(content)) {
      fs.appendFileSync(filePath, content);
    }
  } else {
    writeFile(filePath, content);
  }
}