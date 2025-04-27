import * as path from "path";
import { FileUtils } from "./FileUtils";
import { Configuration } from "./Configuration";

export class DirectoryStructureGenerator {
  private config = Configuration.getConfig();

  /**
   * Creates the complete folder structure for a Flutter project
   * @param workspaceFolder Workspace root path
   */
  public createProjectFolderStructure(workspaceFolder: string): void {
    const libPath = path.join(workspaceFolder, this.config.flutterProjectRoot);

    // Create core directories
    this.createDirectoryStructure(libPath, [
      this.config.coreDirectory,
      path.join(this.config.coreDirectory, this.config.baseDirectory),
      path.join(this.config.coreDirectory, this.config.diDirectory),
      path.join(this.config.coreDirectory, this.config.helperDirectory),
      path.join(this.config.coreDirectory, this.config.mahasDirectory),
      path.join(
        this.config.coreDirectory,
        this.config.mahasDirectory,
        this.config.mahasInputDirectory
      ),
      path.join(
        this.config.coreDirectory,
        this.config.mahasDirectory,
        this.config.mahasWidgetDirectory
      ),
      path.join(this.config.coreDirectory, this.config.coreServiceDirectory),
      path.join(this.config.coreDirectory, this.config.themeDirectory),
      path.join(this.config.coreDirectory, this.config.utilsDirectory),
    ]);

    // Create data layer directories
    this.createDirectoryStructure(libPath, [
      this.config.dataDirectory,
      path.join(this.config.dataDirectory, this.config.modelsDirectory),
      path.join(this.config.dataDirectory, this.config.datasourceDirectory),
      path.join(
        this.config.dataDirectory,
        this.config.datasourceDirectory,
        this.config.networkDirectory
      ),
      path.join(
        this.config.dataDirectory,
        this.config.datasourceDirectory,
        this.config.networkDirectory,
        this.config.repositoryDirectory
      ),
      path.join(
        this.config.dataDirectory,
        this.config.datasourceDirectory,
        this.config.networkDirectory,
        this.config.serviceDirectory
      ),
      path.join(
        this.config.dataDirectory,
        this.config.datasourceDirectory,
        "local"
      ),
      path.join(
        this.config.dataDirectory,
        this.config.datasourceDirectory,
        "local",
        this.config.repositoryDirectory
      ),
      path.join(
        this.config.dataDirectory,
        this.config.datasourceDirectory,
        "local",
        this.config.serviceDirectory
      ),
      path.join(
        this.config.dataDirectory,
        this.config.datasourceDirectory,
        this.config.networkDirectory,
        this.config.dbDirectory
      ),
    ]);

    // Create presentation layer directories - base structure without state management specific folders
    this.createDirectoryStructure(libPath, [
      this.config.presentationDirectory,
      path.join(this.config.presentationDirectory, this.config.pagesDirectory),
      path.join(this.config.presentationDirectory, this.config.routesDirectory),
      path.join(this.config.presentationDirectory, "widgets"),
    ]);

    console.log("Project folder structure created successfully.");
  }

  /**
   * Creates multiple directories at once
   * @param basePath Base path to create directories from
   * @param directories List of directory paths relative to basePath
   */
  private createDirectoryStructure(
    basePath: string,
    directories: string[]
  ): void {
    for (const dir of directories) {
      const dirPath = path.join(basePath, dir);
      FileUtils.createDirectoryIfNotExists(dirPath);
    }
  }
}
