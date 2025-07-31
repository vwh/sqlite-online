export {};

declare global {
  interface Window {
    loadDatabaseBuffer: (buffer: ArrayBuffer) => Promise<void>;
  }
}
