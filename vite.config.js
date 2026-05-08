import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function fontPreloadPlugin() {
  return {
    name: 'font-preload',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;
      const fontLinks = [];
      for (const [name, chunk] of Object.entries(ctx.bundle)) {
        if (name.endsWith('.woff2')) {
          fontLinks.push({
            tag: 'link',
            attrs: { rel: 'preload', href: `./${name}`, as: 'font', type: 'font/woff2', crossorigin: true },
            injectTo: 'head-prepend',
          });
        }
      }
      return fontLinks;
    },
  };
}

export default defineConfig({
  base: './',

  plugins: [vue(), fontPreloadPlugin()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  server: {
    port: 5173,
    open: false,
    host: true,
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
});
