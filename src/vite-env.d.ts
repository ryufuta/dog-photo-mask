/// <reference types="vite/client" />

declare module '*.tflite' {
  const path: string;
  export default path;
}

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
