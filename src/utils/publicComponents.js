import Affix from 'easy-affix'
import ElementUI from 'element-ui'
import Print from 'vue-print-nb'
import wyhElementTable from '@/components/LbTable/index'
wyhElementTable.mixins[0].props.definitionData.default = 'data.list'
wyhElementTable.mixins[0].props.definitionTotal.default = 'data.totalCount'
// 全局自定义组件库
const publicComponents = {
  install: function (Vue) {
    Vue.use(ElementUI);
    Vue.use(Print);
    Vue.component('affix', Affix);
    Vue.component(wyhElementTable.name, wyhElementTable)
  }
}

// 导出组件
export default publicComponents
