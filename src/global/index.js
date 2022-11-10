import Vue from 'vue'
import style from './style'
import page from './page'

import PublicEnumeration from './PublicEnumeration'
const globals = [
  {
    PublicEnumeration: PublicEnumeration,
  },
  {
    style: style,
  },
  {
    page: page,
  },
]
globals.forEach((item) => {
  for (var key in item) {
    Vue.prototype['$' + key] = item[key]

    console.log(key);
  }
})

console.log(Vue.prototype)