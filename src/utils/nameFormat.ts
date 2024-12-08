export const toPascalCase = (str: string) => {
  return str
    .split("_") // Pisahkan berdasarkan underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Huruf pertama kapital
    .join(""); // Gabungkan kembali
};

export const toCamelCase = (str: string) => {
  const pascalCase = toPascalCase(str);
  return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1); // Huruf pertama kecil
};
