/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_S3: string;
  readonly VITE_S3_BUCKET: string;
  readonly VITE_S3_REGION: string;
  readonly VITE_S3_ACCESSKEY: string;
  readonly VITE_S3_SECRETKEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
