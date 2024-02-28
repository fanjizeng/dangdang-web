import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
// import store from '@/store'
import 'amfe-flexible'
import '@/assets/font/iconfont.css'
// import '@/styles/index.scss'
import 'vant/lib/index.css'
import { LoadImgUtil } from './utils/imgUtils'
import { createPinia } from 'pinia'


LoadImgUtil.storageImgList()
const app = createApp(App);

app.use(router);
app.use(createPinia())
// app.use(store);

app.mount('#app');
