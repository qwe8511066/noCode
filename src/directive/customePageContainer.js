import Vue from 'vue';

// customePageContainer: 在设计模式下 隐藏dom 还能container row col设计
Vue.directive('customePageContainer', {
  bind(el, binding, vnode, oldVnode) {
    typeContainerRowColClass(el,binding.value)
  },
  update: function (el,binding) {
    typeContainerRowColClass(el,binding.value)
  }

})

function typeContainerRowColClass(el,value){ 
  // if(value && el.className.includes('hidden') && el.className){
  //   el.style.display = el.className.includes('row')?'flex':'block'
  //   el.style.opacity = 0.7
  // }
}