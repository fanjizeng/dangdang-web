import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';

const pathResolve = (dir: string) => resolve(__dirname, dir);

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  // 获取环境变量
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
  return defineConfig({
    define: {
      'process.env': env,
    },
    plugins: [
      vue(),
      // 默认会向 index.html 注入 .env 文件的内容，类似 vite 的 loadEnv函数
      // 还可配置entry入口文件， inject自定义注入数据等
      createHtmlPlugin(),
      // 自动导入src/compoents下的组件和配置的ui库组件
      // 只能在template中使用，js中需要手动导入
      // vant组件需要带上van前缀
      // 自定义组件没有类型提示问题：在tsconfig的include中加入"./components.d.ts"即可解决
      // Vant 中有个别组件是以函数的形式提供的，包括 Toast，Dialog，Notify 和 ImagePreview 组件。
      // 在使用函数组件时，unplugin-vue-components 无法自动引入对应的样式，因此需要手动引入样式。
      // VantResolver({ importStyle: false }):关闭自动导入样式，关闭会导致vant样式变小，建议默认
      // 目前无法指定"src/compoents"下部分组件生产类型声明，可能需要自己实现一个resolvers
      Components({
        resolvers: [VantResolver()],
        // globs: ['src/components/**/index.vue'], // 会导致index.vue生成的类型声明为Undefined
      })
    ],
    resolve: {
      // 这里的alias是路径别名，是运行阶段的替换路径，而tsconfig.json中的paths是编码阶段的提示，
      alias: {
        '@': pathResolve('./src'), // path.resolve中，'./src' 等于 'src'
        // '@router': pathResolve('src/router'),
      },
    },
    server: {
      port: 3000, // 默认 // vite3已改为默认5173
      host: true, // 支持从ip启动
      open: true,
      proxy: {
        '/dang': {
          target: 'http://127.0.0.1:3002', // 后台服务地址
          changeOrigin: true, // 是否允许不同源
          secure: false, // 支持https
          rewrite: path => path.replace(/^\/dang/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/index.scss";',
        },
      },
    },
  })
}
