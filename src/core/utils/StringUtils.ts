export class StringUtils {
  /**
   * Replaces all occurrences of a substring in a string
   * @param str The original string
   * @param find The substring to find
   * @param replace The replacement
   * @returns The modified string
   */
  static replaceAll(str: string, find: string, replace: string): string {
    return str.split(find).join(replace);
  }

  /**
   * Capitalizes the first letter of a string
   * @param str The string to capitalize
   * @returns The capitalized string
   */
  static capitalize(str: string): string {
    if (!str || str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Lowercases the first letter of a string
   * @param str The string to lowercase
   * @returns The modified string
   */
  static lowercaseFirst(str: string): string {
    if (!str || str.length === 0) return str;
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  /**
   * Creates a pluralized form of a string
   * This is a very simple implementation and doesn't handle all English pluralization rules
   * @param str The string to pluralize
   * @returns The pluralized string
   */
  static pluralize(str: string): string {
    if (!str || str.length === 0) return str;
    if (str.endsWith("y")) {
      return str.slice(0, -1) + "ies";
    }
    if (
      str.endsWith("s") ||
      str.endsWith("x") ||
      str.endsWith("z") ||
      str.endsWith("ch") ||
      str.endsWith("sh")
    ) {
      return str + "es";
    }
    return str + "s";
  }
}
