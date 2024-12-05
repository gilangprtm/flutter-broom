declare global {
  interface String {
    toClassName(): string;
    toCamelCase(): string;
    toTitleCase(): string;
  }
}

// Pastikan untuk mengimpor file ini dalam file TypeScript utama Anda.
export {};
