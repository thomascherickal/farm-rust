import { defineConfig } from '@farmfe/core';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite'

import less from '@farmfe/js-plugin-less';
import postcss from '@farmfe/js-plugin-postcss';

export default defineConfig({
  compilation: {
    persistentCache: false,
  },
  plugins: [
    '@farmfe/plugin-sass',
    less(),
    postcss(),
    {
      name: 'remove-css-filter-plugin',
      priority: 0,
      transform: {
        filters: {
          resolvedPaths: [
            'src/components/HelloWorld.vue\\?vue&(.+)&lang\\.scss'
          ]
        },
        executor({ content }) {
          return {
            content: content.replace('filter: alpha(opacity=0);', '')
          };
        }
      }
    }
  ],
  vitePlugins: [
    VueRouter(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      imports: [
        VueRouterAutoImports
      ]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
    })
  ]
});
