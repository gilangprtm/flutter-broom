import { writeFileSync, mkdirSync, readFileSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { config } from "../utils/config";

// Fungsi untuk menambahkan dependencies ke pubspec.yaml
const updatePubspecYaml = (workspaceFolder: string) => {
  const pubspecPath = path.join(workspaceFolder, "pubspec.yaml");
  let content = readFileSync(pubspecPath, "utf-8");

  // Menghapus komentar atau bagian yang dimulai dengan '#'
  content = content
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n");

  // List dependencies yang akan ditambahkan
  const newDependencies = `
  provider: ^6.1.2
  flutter_easyloading: ^3.0.5
  dio: ^5.7.0
  pretty_dio_logger: ^1.4.0`;

  // Cek apakah 'dependencies' sudah ada, jika belum, tambahkan
  if (
    !content.includes("provider:") ||
    !content.includes("flutter_easyloading:") ||
    !content.includes("dio:") ||
    !content.includes("pretty_dio_logger:")
  ) {
    // Cari bagian dependencies dan masukkan dependencies baru setelahnya
    const dependenciesIndex =
      content.indexOf("dependencies:") + "dependencies:".length;
    const beforeDependencies = content.slice(0, dependenciesIndex);
    const afterDependencies = content.slice(dependenciesIndex);

    // Tambahkan dependencies baru setelah bagian dependencies yang ada
    content = beforeDependencies + newDependencies + afterDependencies;

    // Simpan perubahan ke pubspec.yaml
    writeFileSync(pubspecPath, content);

    vscode.window.showInformationMessage(
      "Pubspec.yaml updated with required dependencies."
    );
  } else {
    vscode.window.showInformationMessage(
      "Dependencies already up to date in pubspec.yaml."
    );
  }
};

export { updatePubspecYaml };
