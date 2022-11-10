import Vue from 'vue';
import { checkArray } from '@/utils/index'
// v-guideComponentTheRemainingHighly: 自定义页面的自定义组件占据剩余高度
Vue.directive('guideComponentDirective', {
  inserted(el, binding, vnode, oldVnode) {
    guideComponentDirectiveFn(el, binding, vnode, oldVnode)
  },
  componentUpdated(el, binding, vnode, oldVnode) {
    guideComponentDirectiveFn(el, binding, vnode, oldVnode)
  },
})

function guideComponentDirectiveFn(el, binding, vnode, oldVnode) {
  if (checkArray(binding.value)) {
    binding.value.forEach(key => {
      switch (key) {
        //给组件占据剩余的高度
        case 'theRemainingHighly':
          const componentType = el.getAttribute('component-type')
          //嵌套布局
          const layoutNestType = el.getAttribute('layout-nest-type');
          switch (componentType) {
            case 'imgae':
              el.querySelectorAll('div').forEach(item => {
                item.classList.add('md|h-full')
              })
              break;
            case 'tabs':
              el.classList.add('md|flex');
              el.classList.add('md|flex-col');
              el.querySelector('.el-tabs__content').classList.add('md|h-full')
              break;
            default:
              break;
          }

          if (layoutNestType) {
            checkLayoutNestLayoutRootayoutNestSetHeight(el);
          }

          checkColGroupSetHeight(el);
          break;
        //鼠标划过col 缩放图片
        case 'hoverColImgZoom':
          const _img = el.querySelector('img');
          const _addImgList = ['transform', 'duration-1000']
          _addImgList.forEach(item => {
            _img.classList.add(item);
          })
          _img.parentNode.classList.add('overflow-hidden');
          //鼠标进
          el.onmouseover = function () {
            _img.classList.add('scale-110');
          }
          //鼠标出
          el.onmouseout = function () {
            _img.classList.remove('scale-110');
            _img.classList.add('scale-100');
          }
          break;

        //row折叠面板
        case 'rowCollapse':
          if (getStyle(el, 'display') === "grid") {
            //限制的行数
            let truncate = 2;
            const rowNumber = getStyle(el, 'gridTemplateColumns').split(" ").length;
            const item = el.querySelectorAll('.col');
            if (item.length > 0) {
              //判断当前限制的行数是否与当前的length 匹配
              truncate = (((truncate - 1) * rowNumber) + 1) > item.length ? 1 : truncate;
              //限制行数的索引 如限制第三行  获取第三行的第一个的索引
              // 第三行的第一个的距离顶部的高度 +　当前行数的高度　　＝　所展示的限制高度
              //索引是从0开始计算  所以不用+1
              const truncateNumber = (truncate - 1) * rowNumber;
              const truncateItem = el.querySelectorAll('.col')[truncateNumber];

              //限制的高度
              setTimeout(() => {
                const rowHeight = (truncateItem.offsetHeight +truncateItem.offsetTop) + 'px';
                additionalRowCollapseButtom(el);
                el.style.height = rowHeight
                const rowCollapseButtom = el.parentNode.querySelector('.rowCollapseButtom')
                rowCollapseButtom.onclick = function(){
                  if(rowCollapseButtom.className.includes('el-icon-arrow-down')){
                    rowCollapseButtom.classList.remove('el-icon-arrow-down')
                    rowCollapseButtom.classList.add('el-icon-arrow-up')
                    el.style.height = 'auto';
                  }else{
                    rowCollapseButtom.classList.add('el-icon-arrow-down')
                    rowCollapseButtom.classList.remove('el-icon-arrow-up')
                    el.style.height = rowHeight;
                  }
                }
              }, 333);
            }
          }
          break;

           //row 逐步显示
        case 'develop':
          if (getStyle(el, 'display') === "grid") {
            //限制的行数
            let truncate = 2;
            const rowNumber = getStyle(el, 'gridTemplateColumns').split(" ").length;
            const item = el.querySelectorAll('.col');
            if (item.length > 0) {
              //判断当前限制的行数是否与当前的length 匹配
              truncate = (((truncate - 1) * rowNumber) + 1) > item.length ? 1 : truncate;
              //限制行数的索引 如限制第三行  获取第三行的第一个的索引
              // 第三行的第一个的距离顶部的高度 +　当前行数的高度　　＝　所展示的限制高度
              //索引是从0开始计算  所以不用+1
              let truncateNumber = (truncate * rowNumber) -1; 
              item.forEach((box,index)=>{
                if(index > truncateNumber){
                  box.style.display = 'none'
                }
              });

              //限制的行数显示
              setTimeout(() => {
                additionalRowCollapseButtom(el);
                const rowCollapseButtom = el.parentNode.querySelector('.rowCollapseButtom')
                rowCollapseButtom.onclick = function(){
                  for (let index = truncateNumber; index < truncateNumber + rowNumber; index++) {
                    if(item[index]){
                      item[index].style.display = 'block';
                    }
                  }
                  truncateNumber = truncateNumber + rowNumber;
                  if(truncateNumber >= item.length){
                    rowCollapseButtom.style.display = 'none';
                  }
                }
              }, 333);
            }
          }
          break;
          


        default:
          break;
      }
    });
  }
}

function additionalRowCollapseButtom(el){
  if(el.parentNode.querySelectorAll('.rowCollapseButtom').length == 0){
    const _div = document.createElement('div');
    _div.innerHTML = '<div class="text-center"><i class="el-icon-arrow-down text-32 rowCollapseButtom"></i></div>';
    
    el.style.overflow = 'hidden'
    el.parentNode.appendChild(_div)
  }
}

//找到col 下的list-group 
function checkColGroupSetHeight(el) {
  el.classList.add('md|h-full');
  if (el.className.includes('list-group')) {
    el.classList.add('md|flex');
    el.classList.add('md|flex-col');
  } else {
    checkColGroupSetHeight(el.parentNode);
  }
}

function checkLayoutNestLayoutRootayoutNestSetHeight(el) {
  el.classList.add('md|h-full');
  if (el.className.includes('layoutNestLayoutRoot')) {

  } else {
    if (el.className.includes('layoutNestLayoutChild')) {
      el.classList.add('md|flex');
      el.classList.add('md|flex-col');
    }
    checkLayoutNestLayoutRootayoutNestSetHeight(el.parentNode);
  }
}

function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}