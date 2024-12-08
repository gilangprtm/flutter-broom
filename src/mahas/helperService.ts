import { writeFileSync, mkdirSync, readFileSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { config } from "../utils/config";

// Fungsi untuk generate file folder routes
const generateHelper = (workspaceFolder: string) => {
  const dialogHelper = path.join(
    workspaceFolder,
    config.flutterProjectRoot,
    config.coreDirectory,
    config.helperDirectory,
    "dialog_helper.dart"
  );

  // Membuat folder jika belum ada
  const dialogHelperPath = path.dirname(dialogHelper);
  mkdirSync(dialogHelperPath, { recursive: true });

  const dialogHelperContent = `
import 'package:flutter/material.dart';

class DialogHelper {
  static void showErrorDialog(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Error'),
          content: Text(message),
          actions: <Widget>[
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  static void showInfoDialog(BuildContext context, String message) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Information'),
          content: Text(message),
          actions: <Widget>[
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  static void showLoadingDialog(BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) {
        return const Dialog(
          child: Padding(
            padding: EdgeInsets.all(20.0),
            child: Row(
              children: [
                CircularProgressIndicator(),
                SizedBox(width: 15),
                Text("Loading..."),
              ],
            ),
          ),
        );
      },
    );
  }

  static void hideDialog(BuildContext context) {
    Navigator.of(context, rootNavigator: true).pop();
  }
}
      `;

  // Membuat file jika belum ada
  writeFileSync(dialogHelper, dialogHelperContent);

  vscode.window.showInformationMessage("Helper generated successfully!");
};

export { generateHelper };
