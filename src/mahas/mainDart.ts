import { writeFileSync, mkdirSync, readFileSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { config } from "../utils/config";

// Fungsi untuk membuat file `main.dart` dan struktur awal proyek
const generateMainDart = (workspaceFolder: string) => {
  const mainFilePath = path.join(
    workspaceFolder,
    config.flutterProjectRoot,
    "main.dart"
  );

  const content = `
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'presentation/routes/app_providers.dart';
import 'presentation/routes/app_routes.dart';
import 'presentation/routes/app_routes_provider.dart';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

void main() {
  runApp(
    MultiProvider(
      providers: AppProviders.getProviders(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      theme: ThemeData.light(),
      debugShowCheckedModeBanner: false,
      initialRoute: AppRoutes.home,
      routes: AppRoutesProvider.getRoutes(),
      navigatorKey: navigatorKey,
    );
  }
}
    `;

  // Membuat folder jika belum ada dan menulis konten ke dalam file main.dart
  mkdirSync(path.dirname(mainFilePath), { recursive: true });
  writeFileSync(mainFilePath, content);

  console.log("File main.dart telah berhasil dibuat.");
};

export { generateMainDart };
