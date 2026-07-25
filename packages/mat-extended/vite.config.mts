/// <reference types='vitest' />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/mat-extended',
  plugins: [angular()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    name: 'mat-extended',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,cropper/src,file-upload/src,file-manager/src,data-table/src,toast/src,dialog/src,menu/src,breadcrumb/src,multi-select/src,autocomplete/src,on-this-page/src}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['src/test-setup.ts'],
    reporters: ['default'],
    testTimeout: 2000,
    hookTimeout: 2000,
    teardownTimeout: 2000,
    coverage: {
      reportsDirectory: '../../coverage/packages/mat-extended',
      provider: 'v8' as const,
    },
  },
});
