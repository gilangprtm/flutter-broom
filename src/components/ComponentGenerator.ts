import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";
import { FileUtils } from "../core/utils/FileUtils";
import { Configuration } from "../core/utils/Configuration";

import * as themeTemplates from "./theme";
import * as utilsTemplates from "./utils";
import * as widgetTemplates from "./widgets";
import * as inputTemplates from "./inputs";

/**
 * Generator untuk komponen-komponen UI seperti widget dan theme
 */
export class ComponentGenerator {
  private config = Configuration.getConfig();
  private readonly WIDGET_TYPES = [
    "accordion",
    "alert",
    "avatar",
    "badge",
    "bottomsheet",
    "button",
    "card",
    "grid",
    "image",
    "loader",
    "menubar",
    "responsive",
    "searchbar",
    "snackbar",
    "tab",
    "tile",
    "toast",
  ];

  private readonly UTILS_TYPES = ["format", "mahas", "type"];

  private readonly INPUT_TYPES = [
    "text",
    "checkbox",
    "radio",
    "dropdown",
    "datetime",
    "box",
  ];

  /**
   * Generate komponen theme
   * @param workspaceFolder Root folder workspace
   * @param themeType Jenis theme (colors, typography, complete)
   */
  public generateThemeComponent(
    workspaceFolder: string,
    themeType: string
  ): void {
    const libPath = path.join(workspaceFolder, this.config.flutterProjectRoot);
    const themeDirPath = path.join(
      libPath,
      this.config.coreDirectory,
      this.config.themeDirectory
    );

    // Pastikan direktori theme ada
    FileUtils.createDirectoryIfNotExists(themeDirPath);

    try {
      switch (themeType) {
        case "colors":
          this.generateColorTheme(themeDirPath);
          break;
        case "typography":
          this.generateTypographyTheme(themeDirPath);
          break;
        case "complete":
          this.generateCompleteTheme(themeDirPath);
          break;
        default:
          throw new Error(`Theme type ${themeType} tidak dikenali`);
      }

      vscode.window.showInformationMessage(
        `Theme component ${themeType} berhasil dibuat di ${themeDirPath}`
      );
    } catch (error) {
      vscode.window.showErrorMessage(
        `Gagal membuat komponen theme: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Generate komponen utils
   * @param workspaceFolder Root folder workspace
   * @param utilsType Jenis utils (format, mahas, type, all)
   */
  public generateUtilsComponent(
    workspaceFolder: string,
    utilsType: string
  ): void {
    const libPath = path.join(workspaceFolder, this.config.flutterProjectRoot);
    const utilsDirPath = path.join(
      libPath,
      this.config.coreDirectory,
      this.config.utilsDirectory
    );

    // Pastikan direktori utils ada
    FileUtils.createDirectoryIfNotExists(utilsDirPath);

    try {
      if (utilsType === "all") {
        this.generateAllUtils(utilsDirPath);
      } else if (this.UTILS_TYPES.includes(utilsType)) {
        this.generateSingleUtils(utilsDirPath, utilsType);
      } else {
        throw new Error(`Utils type ${utilsType} tidak dikenali`);
      }

      vscode.window.showInformationMessage(
        `Utils component ${utilsType} berhasil dibuat di ${utilsDirPath}`
      );
    } catch (error) {
      vscode.window.showErrorMessage(
        `Gagal membuat komponen utils: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Generate komponen widget
   * @param workspaceFolder Root folder workspace
   * @param widgetType Jenis widget atau 'all'
   */
  public generateWidgetComponent(
    workspaceFolder: string,
    widgetType: string
  ): void {
    const libPath = path.join(workspaceFolder, this.config.flutterProjectRoot);
    const widgetDirPath = path.join(
      libPath,
      this.config.coreDirectory,
      this.config.mahasDirectory,
      this.config.mahasWidgetDirectory
    );

    // Pastikan direktori widgets ada
    FileUtils.createDirectoryIfNotExists(widgetDirPath);

    try {
      if (widgetType === "all") {
        this.generateAllWidgets(widgetDirPath);
      } else if (this.WIDGET_TYPES.includes(widgetType)) {
        this.generateSingleWidget(widgetDirPath, widgetType);
      } else {
        throw new Error(`Widget type ${widgetType} tidak dikenali`);
      }

      vscode.window.showInformationMessage(
        `Widget component ${widgetType} berhasil dibuat di ${widgetDirPath}`
      );
    } catch (error) {
      vscode.window.showErrorMessage(
        `Gagal membuat komponen widget: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Generate komponen input
   * @param workspaceFolder Root folder workspace
   * @param inputType Jenis input atau 'all'
   */
  public generateInputComponent(
    workspaceFolder: string,
    inputType: string
  ): void {
    const libPath = path.join(workspaceFolder, this.config.flutterProjectRoot);
    const inputDirPath = path.join(
      libPath,
      this.config.coreDirectory,
      this.config.mahasDirectory,
      this.config.mahasInputDirectory
    );

    // Pastikan direktori input ada
    FileUtils.createDirectoryIfNotExists(inputDirPath);

    try {
      if (inputType === "all") {
        this.generateAllInputs(inputDirPath);
      } else if (this.INPUT_TYPES.includes(inputType)) {
        this.generateSingleInput(inputDirPath, inputType);
      } else {
        throw new Error(`Input type ${inputType} tidak dikenali`);
      }

      vscode.window.showInformationMessage(
        `Input component ${inputType} berhasil dibuat di ${inputDirPath}`
      );
    } catch (error) {
      vscode.window.showErrorMessage(
        `Gagal membuat komponen input: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Generate color theme
   */
  private generateColorTheme(themeDirPath: string): void {
    const colorFilePath = path.join(themeDirPath, "app_colors.dart");
    const colorContent = themeTemplates.AppColor;
    FileUtils.writeFile(colorFilePath, colorContent);
  }

  /**
   * Generate typography theme
   */
  private generateTypographyTheme(themeDirPath: string): void {
    const typographyFilePath = path.join(themeDirPath, "app_typography.dart");
    const typographyContent = themeTemplates.AppTypograph;
    FileUtils.writeFile(typographyFilePath, typographyContent);
  }

  /**
   * Generate complete theme
   */
  private generateCompleteTheme(themeDirPath: string): void {
    // Generate individual theme files first
    this.generateColorTheme(themeDirPath);
    this.generateTypographyTheme(themeDirPath);

    // Generate main theme file
    const themeFilePath = path.join(themeDirPath, "app_theme.dart");
    const themeContent = themeTemplates.AppTheme;
    FileUtils.writeFile(themeFilePath, themeContent);
  }

  /**
   * Generate single utils dari template
   * @param utilsDirPath Path direktori utils
   * @param utilsType Jenis utils
   */
  private generateSingleUtils(utilsDirPath: string, utilsType: string): void {
    const fileName = `${utilsType}_utils.dart`;
    const filePath = path.join(utilsDirPath, fileName);

    // Mendapatkan nama template yang sesuai (mis. AppFormat, AppMahas, AppType)
    const templateName = `App${
      utilsType.charAt(0).toUpperCase() + utilsType.slice(1)
    }`;

    // @ts-ignore - Template pasti ada berdasarkan validasi di atas
    const content = utilsTemplates[templateName];

    if (!content) {
      throw new Error(`Template untuk ${utilsType} tidak ditemukan`);
    }

    FileUtils.writeFile(filePath, content);
  }

  /**
   * Generate semua jenis utils
   */
  private generateAllUtils(utilsDirPath: string): void {
    this.UTILS_TYPES.forEach((utilsType) => {
      this.generateSingleUtils(utilsDirPath, utilsType);
    });
  }

  /**
   * Generate single widget dari template
   * @param widgetDirPath Path direktori widget
   * @param widgetType Jenis widget
   */
  private generateSingleWidget(
    widgetDirPath: string,
    widgetType: string
  ): void {
    const fileName = `mahas_${widgetType}.dart`;
    const filePath = path.join(widgetDirPath, fileName);

    // Mendapatkan nama template yang sesuai (mis. CustomButtonTemplate, CustomCardTemplate)
    const templateName = `Custom${
      widgetType.charAt(0).toUpperCase() + widgetType.slice(1)
    }Template`;

    // @ts-ignore - Template pasti ada berdasarkan validasi di atas
    const content = widgetTemplates[templateName];

    if (!content) {
      throw new Error(`Template untuk ${widgetType} tidak ditemukan`);
    }

    FileUtils.writeFile(filePath, content);
  }

  /**
   * Generate semua jenis widget
   */
  private generateAllWidgets(widgetDirPath: string): void {
    this.WIDGET_TYPES.forEach((widgetType) => {
      this.generateSingleWidget(widgetDirPath, widgetType);
    });
  }

  /**
   * Generate single input dari template
   * @param inputDirPath Path direktori input
   * @param inputType Jenis input
   */
  private generateSingleInput(inputDirPath: string, inputType: string): void {
    const fileName = `mahas_input_${inputType}.dart`;
    const filePath = path.join(inputDirPath, fileName);

    // Mendapatkan nama template yang sesuai
    let templateName = `Input${
      inputType.charAt(0).toUpperCase() + inputType.slice(1)
    }Component`;

    // @ts-ignore - Template pasti ada berdasarkan validasi di atas
    const content = inputTemplates[templateName];

    if (!content) {
      throw new Error(`Template untuk input ${inputType} tidak ditemukan`);
    }

    FileUtils.writeFile(filePath, content);
  }

  /**
   * Generate semua jenis input
   */
  private generateAllInputs(inputDirPath: string): void {
    this.INPUT_TYPES.forEach((inputType) => {
      this.generateSingleInput(inputDirPath, inputType);
    });
  }
}
