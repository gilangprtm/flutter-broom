export class TemplateUtils {
  /**
   * Renders a template string by replacing placeholders with values
   * @param template Template string with {{key}} placeholders
   * @param context Object with key-value pairs to replace in template
   * @returns Rendered template string
   */
  static render(template: string, context: Record<string, any>): string {
    let result = template;
    for (const [key, value] of Object.entries(context)) {
      result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
    }
    return result;
  }

  /**
   * Indents a multiline string with specified number of spaces
   * @param str String to indent
   * @param spaces Number of spaces to indent
   * @returns Indented string
   */
  static indent(str: string, spaces: number): string {
    const padding = " ".repeat(spaces);
    return str
      .split("\n")
      .map((line) => (line ? padding + line : line))
      .join("\n");
  }
}
