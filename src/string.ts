// stringExtensions.ts

String.prototype.toClassName = function (): string {
  return this.split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

String.prototype.toCamelCase = function (): string {
  const words = this.split("_");
  const firstWord = words[0].toLowerCase();
  const camelCase =
    firstWord +
    words
      .slice(1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  return camelCase;
};

String.prototype.toTitleCase = function (): string {
  return this.split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
