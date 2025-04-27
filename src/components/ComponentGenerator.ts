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
   * @param utilsType Jenis utils (format, mahas, all)
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
      switch (utilsType) {
        case "format":
          this.generateFormatUtils(utilsDirPath);
          break;
        case "mahas":
          this.generateMahasUtils(utilsDirPath);
          break;
        case "type":
          this.generateTypeUtils(utilsDirPath);
          break;
        case "all":
          this.generateAllUtils(utilsDirPath);
          break;
        default:
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
   * @param widgetType Jenis widget (button, card, input)
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
      switch (widgetType) {
        case "button":
          this.generateButtonWidget(widgetDirPath);
          break;
        case "card":
          this.generateCardWidget(widgetDirPath);
          break;
        case "input":
          this.generateInputWidget(widgetDirPath);
          break;
        default:
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
   * Generate format utils
   */
  private generateFormatUtils(utilsDirPath: string): void {
    const formatFilePath = path.join(utilsDirPath, "format_utils.dart");
    const formatContent = utilsTemplates.AppFormat;
    FileUtils.writeFile(formatFilePath, formatContent);
  }

  /**
   * Generate mahas utils
   */
  private generateMahasUtils(utilsDirPath: string): void {
    const mahasFilePath = path.join(utilsDirPath, "mahas_utils.dart");
    const mahasContent = utilsTemplates.AppMahas;
    FileUtils.writeFile(mahasFilePath, mahasContent);
  }

  /**
   * Generate type utils
   */
  private generateTypeUtils(utilsDirPath: string): void {
    const typeFilePath = path.join(utilsDirPath, "type_utils.dart");
    const typeContent = utilsTemplates.AppType;
    FileUtils.writeFile(typeFilePath, typeContent);
  }

  /**
   * Generate all utils
   */
  private generateAllUtils(utilsDirPath: string): void {
    this.generateFormatUtils(utilsDirPath);
    this.generateMahasUtils(utilsDirPath);
    this.generateTypeUtils(utilsDirPath);
  }

  /**
   * Generate button widget
   */
  private generateButtonWidget(widgetDirPath: string): void {
    const buttonFilePath = path.join(widgetDirPath, "custom_button.dart");
    const buttonContent = widgetTemplates.CustomButtonTemplate;
    FileUtils.writeFile(buttonFilePath, buttonContent);
  }

  /**
   * Generate card widget
   */
  private generateCardWidget(widgetDirPath: string): void {
    const cardFilePath = path.join(widgetDirPath, "custom_card.dart");
    const cardContent = widgetTemplates.CustomCardTemplate;
    FileUtils.writeFile(cardFilePath, cardContent);
  }

  /**
   * Generate input widget
   */
  private generateInputWidget(widgetDirPath: string): void {
    const inputFilePath = path.join(widgetDirPath, "custom_text_field.dart");
    const inputContent = inputTemplates.CustomTextFieldTemplate;
    FileUtils.writeFile(inputFilePath, inputContent);
  }
}
