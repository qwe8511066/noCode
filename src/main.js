import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './styles/index.scss' // global css
import PublicEnumeration from './global/PublicEnumeration'

import publicComponents from "@/utils/publicComponents.js";
import '@/directive/dialogDrag.js' //全局弹窗拖拽
import '@/directive/customePageContainer.js' //在设计模式下 隐藏dom 还能container row col设计
import '@/directive/guideComponentDirective.js' //自定义页面的一些指令 如组件占据剩余的高度 鼠标划过col 缩放图片
//全局变量
import '@/global/';

Vue.use(publicComponents);
Vue.config.productionTip = false
Vue.prototype.$PublicEnumeration = PublicEnumeration //全局枚举库
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
