import { ipadFieldName, pcFieldName, mdFieldName, forFieldList } from '@/global/style'
/**
 * 数组中单独判断
 * @param array 数组
 * @param checkAttribute  判断的属性
 * @param typeString 校验的属性
 * @param return  boolean
 */
export function checkArrayString(array, arrayType, typeString) {
  let index = -1;
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      const type = arrayType.split('.').length < 2 ? (arrayType && array[i][arrayType] == typeString) || (!arrayType && array[i] == typeString) : getMultistage(array[i], arrayType) == typeString
      if (type) {
        index = i;
        break;
      }
    }
  } else {
    throw new Error('传入的类型错误');
  }
  return index;
}
export function checkArray(array) {
  return array && array.length > 0;
}

export function uuid() {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export function getMultistage(data, index) {
  let temp = data;
  let path = index.split('.');
  if (path.length < 2) {
    return data[index]
  }
  for (let index = 0; index < path.length; index++) {
    if (temp[path[index]]) {
      temp = temp[path[index]]
    }
  }
  return temp
}


export function selectChoiceValue(arr, value) {
  return arr && arr[0] ? getMultistage(arr[0], value) : null
}

/**
 * 动态设置对象 如user.admin.page  转成对象
 * @param {*} data  设置的对象
 * @param {*} key   user.admin.page
 * @param {*} value  转换的值
 */
export function setMultistage(data, key, value) {
  let path = key.split('.')
  if (path.length < 2) {
    data[key] = value
    return data
  }
  path.push(value)
  return path.reverse().reduce((a, b) => {
    return { [b]: a }
  })
}

//对象转url 参数 特殊字符转义
export function filter(str) { // 特殊字符转义
  str += ''; // 隐式转换
  str = str.replace(/%/g, '%25');
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/ /g, '%20');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\?/g, '%3F');
  str = str.replace(/&/g, '%26');
  str = str.replace(/\=/g, '%3D');
  str = str.replace(/#/g, '%23');
  return str;
}
//对象转url 参数
export function formateObjToParamStr(paramObj) {
  const sdata = [];
  for (let attr in paramObj) {
    sdata.push(`${attr}=${filter(paramObj[attr])}`);
  }
  return sdata.join('&');
};



export function sonsTree(arr) {
  const temp = [];
  const forFn = (list) => {
    list.forEach(item => {
      if (checkArray(item.children)) {
        forFn(item.children);
      } else {
        temp.push(item);
      }
    })
  };
  forFn(arr);
  return temp;
}

/**
 * 判断是否是栅栏
 * @param {*} dividend  被除数
 * @param {*} divisor   除数
 * @returns 
 */
export function isCol(dividend, divisor = 12) {
  return dividend != 1 && (divisor % dividend === 0)
}

//组件的样式
export function guideComponentStyleClass(value) {
  let list = [];
  if (value && value.styleClass) {
    const styleClass = value.styleClass;

    const fontWeight = judgeStyleClass(styleClass, "fontWeight");
    // const textAlign = judgeStyleClass(styleClass, "textAlign");
    const textLimit = judgeStyleClass(styleClass, "textLimit", "limit-");
    const textTransform = judgeStyleClass(styleClass, "textTransform");

    const borderLeft = judgeStyleClass(
      styleClass,
      "borderLeft",
      "border-l-"
    );
    const borderTop = judgeStyleClass(styleClass, "borderTop", "border-t-");
    const borderRight = judgeStyleClass(
      styleClass,
      "borderRight",
      "border-r-"
    );
    const borderBottom = judgeStyleClass(
      styleClass,
      "borderBottom",
      "border-b-"
    );
    const borderStyle = judgeStyleClass(styleClass, "borderStyle");

    const roundedTl = judgeStyleClass(styleClass, "roundedTl");
    const roundedTr = judgeStyleClass(styleClass, "roundedTr");
    const roundedBl = judgeStyleClass(styleClass, "roundedBl");
    const roundedBr = judgeStyleClass(styleClass, "roundedBr");

    const opacity = judgeStyleClass(styleClass, "opacity");
    const shadow = judgeStyleClass(styleClass, "shadow");
    const textDecoration = judgeStyleClass(styleClass, "textDecoration");

    let gradient = judgeStyleClass(styleClass, "gradient");
    const overflow = judgeStyleClass(styleClass, "overflow");

    if(value.controlType === "container"){
      gradient = '';
    }

    if (value.controlType === "row") {
      const rowWidth = judgeStyleClass(styleClass, "rowWidth", "w-");
      let gridModel = judgeStyleClass(styleClass, "gridModel");
      gridModel = gridModel?'grid':'';
      let rowAttributeList = [
        { name: 'mobileFlexDirection', screensClassName: '', },
        { name: 'mdFlexDirection', screensClassName: mdFieldName },
        { name: 'desktopFlexDirection', screensClassName: pcFieldName },
        { name: 'mobileJustifyContent', screensClassName: '' },
        { name: 'mdJustifyContent', screensClassName: mdFieldName },
        { name: 'desktopJustifyContent', screensClassName: pcFieldName },
        { name: 'mobileItemsContent', screensClassName: '' },
        { name: 'mdItemsContent', screensClassName: mdFieldName },
        { name: 'desktopItemsContent', screensClassName: pcFieldName },
        { name: 'mobileFlexWrap', screensClassName: '' },
        { name: 'mdFlexWrap', screensClassName: mdFieldName },
        { name: 'desktopFlexWrap', screensClassName: pcFieldName },
        { name: 'mobileSpaceX', screensClassName: '', className: 'space-x-' },
        { name: 'mdSpaceX', screensClassName: mdFieldName, className: 'space-x-' },
        { name: 'desktopSpaceX', screensClassName: pcFieldName, className: 'space-x-' },
        { name: 'mobileSpaceY', screensClassName: '', className: 'space-y-' },
        { name: 'mdSpaceY', screensClassName: mdFieldName, className: 'space-y-' },
        { name: 'desktopSpaceY', screensClassName: pcFieldName, className: 'space-y-' },
      ]
      
      if(gridModel){
        const gridList = [
          { name: 'mobileGridCols', screensClassName: '', className: 'grid-cols-' },
          { name: 'mdGridCols', screensClassName: mdFieldName, className: 'grid-cols-' },
          { name: 'desktopGridCols', screensClassName: pcFieldName, className: 'grid-cols-' },

          { name: 'mobileGridGapX', screensClassName: '', className: 'gap-x-' },
          { name: 'mdGridGapX', screensClassName: mdFieldName, className: 'gap-x-' },
          { name: 'desktopGridGapX', screensClassName: pcFieldName, className: 'gap-x-' },

          { name: 'mobileGridGapY', screensClassName: '', className: 'gap-y-' },
          { name: 'mdGridGapY', screensClassName: mdFieldName, className: 'gap-y-' },
          { name: 'desktopGridGapY', screensClassName: pcFieldName, className: 'gap-y-' },
        ]
        rowAttributeList = rowAttributeList.concat(gridList)
      }
      rowAttributeList.forEach(item => {
        let rowAttributeValue = styleClass[item.name]
        if (item.className) {
          rowAttributeValue = rowAttributeValue == -1 ? '' : item.screensClassName + item.className + rowAttributeValue
        } else {
          rowAttributeValue = item.screensClassName + rowAttributeValue
        }
        list.push(rowAttributeValue)
      })

      list.push(
        rowWidth,
        gridModel,
      );
    }

    if (value.controlType === "col") {
      let mobileWidth = judgeStyleClass(styleClass, "mobileWidth", "w-");
      let mdWidth =
        mdFieldName + judgeStyleClass(styleClass, "mdWidth", "w-");
      let desktopWidth =
        pcFieldName +
        judgeStyleClass(styleClass, "desktopWidth", "w-");

      let mobileColFlex = judgeStyleClass(styleClass, "mobileColFlex");
      let desktopColFlex = judgeStyleClass(styleClass, "desktopColFlex");
      let mdColFlex = judgeStyleClass(styleClass, "mdColFlex");
      mdColFlex = mdColFlex ? mdFieldName + mdColFlex: mdColFlex;
      desktopColFlex = desktopColFlex ? pcFieldName + desktopColFlex: desktopColFlex;

      mobileWidth = mobileColFlex?mobileColFlex:mobileWidth
      mdWidth = mdColFlex?mdColFlex:mdWidth
      desktopWidth = desktopColFlex?desktopColFlex:desktopWidth
      list.push(
        mobileWidth,
        mdWidth,
        desktopWidth,
        // mobileColFlex,
        // mdColFlex,
        // desktopColFlex,
      );
    }

    list = [...list, ...judgeStyleClassLgXl(styleClass)];

    list.push(
      fontWeight,
      // textAlign,
      textLimit,
      textTransform,
      borderLeft,
      borderTop,
      borderRight,
      borderBottom,
      borderStyle,
      roundedTl,
      roundedTr,
      roundedBl,
      roundedBr,
      opacity,
      shadow,
      textDecoration,
      gradient,
      overflow
    );
  }
  return list.join(" ");
}

/**
 * 判断styleClass
 * @param {*} value 数据
 * @param {*} fieldName  字段名称
 * @param {*} className  类的名称
 * @param {*} screensClassName 响应式类的名称
 * @returns 
 */
export function judgeStyleClass(value, fieldName, className = "", screensClassName = "") {
  let name = ''
  if (fieldName && value[fieldName]) {
    name = value[fieldName]
    //判断负数
    if (Math.sign(name) == -1 && name.toString().slice(0, 1) === '-') {
      name = screensClassName + '-' + className + parseInt(name.toString().substr(1))
    } else {
      name = screensClassName + className + name
    }
  }

  if (value[fieldName + 'Model']) {
    name = value[fieldName] && value[fieldName] != 12 ? screensClassName + className + value[fieldName] + "/12" : 'w-full';
  }
  return name
}

//判断lg 或者xl 的文本和间距样式
export function judgeStyleClassLgXl(styleClass) {
  const array = [];
  forFieldList.forEach(item => {
    let fontSize = judgeStyleClass(
      styleClass,
      item + "fontSize",
      "text-",
      item
    );
    //判断是否修改文字大小
    if (item) {
      fontSize = styleClass[item + "typeFontSize"] ? fontSize : "";
    }
    const paddingLeft = judgeStyleClass(
      styleClass,
      item + "paddingLeft",
      "pl-",
      item
    );

    const textAlign = judgeStyleClass(
      styleClass,
      item + "textAlign",
      item
    );
    const paddingTop = judgeStyleClass(
      styleClass,
      item + "paddingTop",
      "pt-",
      item
    );
    const paddingRight = judgeStyleClass(
      styleClass,
      item + "paddingRight",
      "pr-",
      item
    );
    const paddingBottom = judgeStyleClass(
      styleClass,
      item + "paddingBottom",
      "pb-",
      item
    );
    const marginLeft = judgeStyleClass(
      styleClass,
      item + "marginLeft",
      "ml-",
      item
    );
    const marginTop = judgeStyleClass(
      styleClass,
      item + "marginTop",
      "mt-",
      item
    );
    const marginRight = judgeStyleClass(
      styleClass,
      item + "marginRight",
      "mr-",
      item
    );
    const marginBottom = judgeStyleClass(
      styleClass,
      item + "marginBottom",
      "mb-",
      item
    );

    let show = judgeStyleClass(styleClass, item + "show");
    show = show ? item + show : show;
    array.push(
      fontSize,
      paddingLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      marginLeft,
      marginTop,
      marginRight,
      marginBottom,
      textAlign,
      show
    );
  });
  return array;
}
