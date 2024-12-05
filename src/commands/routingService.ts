import { writeFileSync, mkdirSync, readFileSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { config } from "../utils/config";

// Fungsi untuk generate file folder routes
const generateRouting = (workspaceFolder: string) => {
  const appProvider = path.join(
    workspaceFolder,
    config.flutterProjectRoot,
    config.presentationDirectory,
    config.routesDirectory,
    "app_providers.dart"
  );

  // Membuat folder jika belum ada
  const appProviderPath = path.dirname(appProvider);
  mkdirSync(appProviderPath, { recursive: true });

  const appProviderContent = `
import 'package:provider/provider.dart';
import 'package:provider/single_child_widget.dart';


class AppProviders {
  static List<SingleChildWidget> getProviders() {
    return [
      
    ];
  }
}
      `;

  // Membuat file jika belum ada
  writeFileSync(appProvider, appProviderContent);

  const appRoutesProvider = path.join(
    workspaceFolder,
    config.flutterProjectRoot,
    config.presentationDirectory,
    config.routesDirectory,
    "app_routes_provider.dart"
  );

  // Membuat folder jika belum ada
  const appRoutesProviderPath = path.dirname(appRoutesProvider);
  mkdirSync(appRoutesProviderPath, { recursive: true });

  const appRoutesProviderContent = `
import 'package:flutter/material.dart';
import 'app_routes.dart';

class AppRoutesProvider {
  static Map<String, WidgetBuilder> getRoutes() {
    return {
      
    };
  }
}
      `;

  // Membuat file jika belum ada
  writeFileSync(appRoutesProvider, appRoutesProviderContent);

  const appRoutes = path.join(
    workspaceFolder,
    config.flutterProjectRoot,
    config.presentationDirectory,
    config.routesDirectory,
    "app_routes.dart"
  );

  // Membuat folder jika belum ada
  const appRoutesPath = path.dirname(appRoutes);
  mkdirSync(appRoutesPath, { recursive: true });

  const appRoutesContent = `
class AppRoutes {
  
}
      `;

  // Membuat file jika belum ada
  writeFileSync(appRoutes, appRoutesContent);
  vscode.window.showInformationMessage("Routing file created with GoRouter.");
};

export { generateRouting };
