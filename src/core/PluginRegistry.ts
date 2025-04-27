import { Plugin } from "./interfaces/Plugin";

export class PluginRegistry {
  private static plugins: Map<string, Plugin> = new Map();

  static register(plugin: Plugin): void {
    this.plugins.set(plugin.id, plugin);
  }

  static getPlugin(id: string): Plugin | undefined {
    return this.plugins.get(id);
  }

  static getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }
}
