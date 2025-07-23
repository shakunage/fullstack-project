import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/index.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild',
    })
  ],
  build: {
    target: 'node18',
    outDir: 'dist',
    ssr: true,
    rollupOptions: {
      input: './src/index.ts',
      output: {
        format: 'cjs',
        entryFileNames: 'index.cjs'
      }
    }
  }
});