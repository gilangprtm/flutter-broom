import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";

export class FileUtils {
  static writeFile(filePath: string, content: string): void {
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(filePath, content);
  }

  static readFile(filePath: string): string {
    return fs.readFileSync(filePath, "utf-8");
  }

  static fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  static createDirectory(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  static updateFileContent(
    filePath: string,
    findPattern: RegExp | string,
    replaceContent: string
  ): boolean {
    if (!this.fileExists(filePath)) {
      return false;
    }

    let content = this.readFile(filePath);
    content = content.replace(findPattern, replaceContent);
    this.writeFile(filePath, content);
    return true;
  }
}
