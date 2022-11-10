import scssVariables from '../../tailwind.variables.config'
import tailwind from '../../tailwind.config'
const colors = tailwind.theme.extend.colors;
let stylePulbicColorVariable = []
let hoverTextColorListVariable = []

//和tailwind.config.js->screens 相匹配
export const ipadFieldName = 'lg' + tailwind.separator;
export const pcFieldName = 'xl' + tailwind.separator;
export const mdFieldName = 'md' + tailwind.separator;

export const forFieldList = [
  "",
  // ipadFieldName,
  pcFieldName,
  mdFieldName,
]

Object.keys(colors).forEach(key => {
  stylePulbicColorVariable.push(colors[key]);
  hoverTextColorListVariable.push({
    label: colors[key],
    value: 'hover' + tailwind.separator + "text-" + key,
  })
})
export const stylePulbicColor = stylePulbicColorVariable

//背景渐变色
export const gradientList = [
  {
    label: '默认',
    value: '',
  },
  {
    label: 'bg-mask-1-0',
    value: 'bg-mask-1-0',
  },
  {
    label: 'bg-mask-primary-to-r',
    value: 'bg-mask-primary-to-r',
  },
  {
    label: 'bg-mask--f5fcff-15-to-b',
    value: 'bg-mask--f5fcff-15-to-b',
  },
  {
    label:'bg-mask-primary-to-b',
    value:'bg-mask-primary-to-b',
  }
]

export const textAlign = [
  {
    label: '默认',
    value: '',
  },
  {
    label: '左对齐',
    value: 'text-left',
  },
  {
    label: '右对齐',
    value: 'text-right',
  },
  {
    label: '居中对齐',
    value: 'text-center',
  },
]

export const styleSpacingModel = [
  {
    label: '像素模式',
    value: '',
  },
  {
    label: '栅格模式',
    value: 'grid',
  },
]

export const styleJustifyContent = [
  {
    label: '起点对齐',
    value: 'justify-start',
  },
  {
    label: '中心点对齐',
    value: 'justify-center',
  },
  {
    label: '结束点对齐',
    value: 'justify-end',
  },
]

export const styleFlexAlignContent = [
  {
    label: '起点对齐',
    value: 'items-start',
  },
  {
    label: '中心点对齐',
    value: 'items-center',
  },
  {
    label: '结束点对齐',
    value: 'items-end',
  },
  {
    label: '拉伸对齐(高度一致)',
    value: 'items-stretch',
  },
]

export const styleColFlex = [
  {
    label: '默认',
    value: '',
  },
  {
    label: '铺满剩下的宽度',
    value: 'flex-1',
  },
  {
    label: 'flex-auto',
    value: 'flex-auto',
  },
  {
    label: 'flex-initial',
    value: 'flex-initial',
  },
  {
    label: 'flex-none',
    value: 'flex-none',
  },
]


export const styleFlexDirection = [
  {
    label: '横向',
    value: 'flex-row',
  },
  {
    label: '横向反向',
    value: 'flex-row-reverse',
  },
  {
    label: '纵向',
    value: 'flex-col',
  },
  {
    label: '纵向反向',
    value: 'flex-col-reverse',
  },
]

export const styleFlexWrap = [
  {
    label: '不换行',
    value: 'flex-nowrap',
  },
  {
    label: '常规换行',
    value: 'flex-wrap',
  },
  {
    label: '反向换行',
    value: 'flex-wrap-reverse',
  },
]

export const borderList = [
  {
    label: '隐藏',
    value: 'border-none',
  },
  {
    label: '点状',
    value: 'border-dotted',
  },
  {
    label: '虚线',
    value: 'border-dashed',
  },
  {
    label: '实线',
    value: 'border-solid',
  },
  {
    label: '双线',
    value: 'border-double',
  }
]


export const borderRoundedList = [
  'none', 'sm', '', 'lg', 'xl', '2xl', '3xl', 'full',
]

export const controlType = [
  {
    label: 'container',
    value: 'container',
  },
  {
    label: 'container-lg(14/12)',
    value: 'container-lg',
  },
  {
    label: 'container-sm(10/12)',
    value: 'container-sm',
  },
  {
    label: 'container-xm(8/12)',
    value: 'container-mn',
  },
  {
    label: 'container-2mn(6/12)',
    value: 'container-2mn',
  },
  {
    label: 'container-3mn(4/12)',
    value: 'container-3mn',
  },
  {
    label: 'full(铺满宽度)',
    value: 'w-full',
  },
]

export const styleFontWeight = [
  {
    label: '默认',
    value: '',
  },
  {
    label: '100',
    value: 'font-thin',
  },
  {
    label: '200',
    value: 'font-extralight',
  },
  {
    label: '300',
    value: 'font-light',
  },
  {
    label: '400',
    value: 'font-normal',
  },
  {
    label: '500',
    value: 'font-medium',
  },
  {
    label: '600',
    value: 'font-semibold',
  },
  {
    label: '700',
    value: 'font-bold',
  },
  {
    label: '800',
    value: 'font-extrabold',
  },
  {
    label: '900',
    value: 'font-black',
  },
]

export const textTransform = [
  {
    label: '默认',
    value: '',
  },
  {
    label: '全部小写',
    value: 'lowercase',
  },
  {
    label: '全部大写',
    value: 'uppercase',
  },
  {
    label: '首字母大写',
    value: 'capitalize',
  },
]


export const animationTypeList = [
  {
    label: '不要动画',
    value: '',
  },
  {
    label: 'Fade',
    value: 'fade',
  },
  {
    label: 'Fade Up',
    value: 'fade-up',
  },
  {
    label: 'Fade Down',
    value: 'fade-down',
  },
  {
    label: 'Fade Left',
    value: 'fade-left',
  },
  {
    label: 'Fade Right',
    value: 'fade-right',
  },
  {
    label: 'Fade Up Right',
    value: 'fade-up-right',
  },
  {
    label: 'Fade Up Left',
    value: 'fade-up-left',
  },
  {
    label: 'Fade Down Right',
    value: 'fade-down-right',
  },
  {
    label: 'Fade Down Left',
    value: 'fade-down-left',
  },
  {
    label: 'Flip Up',
    value: 'flip-up',
  },
  {
    label: 'Flip Down',
    value: 'flip-down',
  },
  {
    label: 'Flip Left',
    value: 'flip-left',
  },
  {
    label: 'Flip Right',
    value: 'flip-right',
  },
  {
    label: 'Slide Up',
    value: 'slide-up',
  },
  {
    label: 'Slide Down',
    value: 'slide-down',
  },
  {
    label: 'Slide Left',
    value: 'slide-left',
  },
  {
    label: 'Slide Right',
    value: 'slide-right',
  },
  {
    label: 'Zoom In',
    value: 'zoom-in',
  },
  {
    label: 'Zoom In Up',
    value: 'zoom-in-up',
  },
  {
    label: 'Zoom In Down',
    value: 'zoom-in-down',
  },
  {
    label: 'Zoom In Left',
    value: 'zoom-in-left',
  },
  {
    label: 'Zoom In Right',
    value: 'zoom-in-right',
  },
  {
    label: 'Zoom Out',
    value: 'zoom-out',
  },
  {
    label: 'Zoom Out Up',
    value: 'zoom-out-up',
  },
  {
    label: 'Zoom Out Down',
    value: 'zoom-out-down',
  },
  {
    label: 'Zoom Out Left',
    value: 'zoom-out-left',
  },
  {
    label: 'Zoom Out Right',
    value: 'zoom-out-right',
  },
]

export const componentList = [
  {
    title: "通用组件",
    list: [
      {
        controlType: "title",
        title: "标题",
        path: '@/components/customePage/publicComponent/title/',
      },
      {
        controlType: "imgae",
        title: "图片",
        path: '@/components/customePage/publicComponent/imgae/'
      },
      {
        controlType: "ueditor",
        title: "富文本",
        path: '@/components/customePage/publicComponent/ueditor/'
      },
      {
        controlType: "iconfont",
        title: "字体图标",
        path: '@/components/customePage/publicComponent/iconfont/'
      },
      {
        controlType: "collapse",
        title: "折叠面板",
        path: '@/components/customePage/publicComponent/collapse/'
      },
      {
        controlType: "carousel",
        title: "走马灯",
        path: '@/components/customePage/publicComponent/carousel/'
      },
      {
        controlType: "tabs",
        title: "选项卡",
        path: '@/components/customePage/publicComponent/tabs/'
      },
      {
        controlType: "steps",
        title: "步骤条",
        path: '@/components/customePage/publicComponent/steps/'
      },
      {
        controlType: "video",
        title: "视频",
        path: '@/components/customePage/publicComponent/video/'
      },
      {
        controlType: "float",
        title: "浮动层",
        path: '@/components/customePage/publicComponent/float/'
      },
      {
        controlType: "view",
        title: "视图",
        path: '@/components/customePage/publicComponent/view/'
      },
      {
        controlType: "spacer",
        title: "占位块",
        path: '@/components/customePage/publicComponent/spacer/'
      }
    ]
  },
  {
    title: "项目组件",
    list: [
      {
        controlType: "showcase-1-0",
        title: "showcase-1-0",
        path: '@/components/customePage/projectComponent/showcase-1-0/'
      }

    ]
  },
  // {
  //   title: "视图组件",
  //   list: [
  //     {
  //       controlType: "view-list-1-0",
  //       title: "view-list-1-0",
  //       path: '@/components/customePage/viewComponent/view-list-1-0/'
  //     }

  //   ]
  // }
]

export const paddingList = [
  {
    title: "左内间距(Padding Left)",
    fieldName: "paddingLeft",
    spacingFieldName: "paddingLeftModel"
  },
  {
    title: "上内间距(Padding Top)",
    fieldName: "paddingTop",
    spacingFieldName: "paddingTopModel"
  },
  {
    title: "右内间距(Padding Right)",
    fieldName: "paddingRight",
    spacingFieldName: "paddingRightModel"
  },
  {
    title: "下内间距(Padding Bottom)",
    fieldName: "paddingBottom",
    spacingFieldName: "paddingBottomModel"
  }
]

export const marginList = [
  {
    title: "左外间距(Margin Left)",
    fieldName: "marginLeft",
    spacingFieldName: "marginLeftModel"
  },
  {
    title: "上外间距(Margin Top)",
    fieldName: "marginTop",
    spacingFieldName: "marginTopModel"
  },
  {
    title: "右外间距(Margin Right)",
    fieldName: "marginRight",
    spacingFieldName: "marginRightModel"
  },
  {
    title: "下外间距(Margin Bottom)",
    fieldName: "marginBottom",
    spacingFieldName: "marginBottomModel"
  }
]

export const borderWidth = [
  {
    title: "左边宽度",
    fieldName: "borderLeft"
  },
  {
    title: "顶部宽度",
    fieldName: "borderTop"
  },
  {
    title: "右边宽度",
    fieldName: "borderRight"
  },
  {
    title: "底部宽度",
    fieldName: "borderBottom"
  }
]

export const borderRounded = [
  {
    title: "左上边框",
    fieldName: "Tl",
    borderFieldName: "-tl"
  },
  {
    title: "右上边框",
    fieldName: "Tr",
    borderFieldName: "-tr"
  },
  {
    title: "右下边框",
    fieldName: "Br",
    borderFieldName: "-br"
  },
  {
    title: "左下边框",
    fieldName: "Bl",
    borderFieldName: "-bl"
  }
]

export const blockAlign = [
  {
    label: '默认',
    value: '',
  },
  {
    label: '左对齐',
    value: 'mr-left',
  },
  {
    label: '右对齐',
    value: 'ml-auto',
  },
  {
    label: '居中对齐',
    value: 'mx-auto',
  },
]

export const cursorList = [
  {
    label: '默认',
    value: 'cursor-default',
  },
  {
    label: '自动',
    value: 'cursor-auto',
  },
  {
    label: '指向(小手)',
    value: 'cursor-pointer',
  },
  {
    label: '等待',
    value: 'cursor-wait',
  },
  {
    label: '文本( I 字形)',
    value: 'cursor-text',
  },
  {
    label: '不允许',
    value: 'cursor-not-allowed',
  },
]

export const shadowList = [
  {
    label: '去除阴影',
    value: 'shadow-none',
  },
  {
    label: 'sm',
    value: 'shadow-sm',
  },
  {
    label: '默认大小',
    value: 'shadow',
  },
  {
    label: 'md',
    value: 'shadow-md',
  },
  {
    label: 'lg',
    value: 'shadow-lg',
  },
  {
    label: 'xl',
    value: 'shadow-xl',
  },
  {
    label: '2xl',
    value: 'shadow-2xl',
  },
  {
    label: '内阴影',
    value: 'shadow-inner',
  },
]

export const opacityList = [
  {
    label: '0',
    value: 'opacity-0',
  },
  {
    label: '5%',
    value: 'opacity-5',
  },
  {
    label: '10%',
    value: 'opacity-10',
  },
  {
    label: '20%',
    value: 'opacity-20',
  },
  {
    label: '25%',
    value: 'opacity-25',
  },
  {
    label: '30%',
    value: 'opacity-30',
  },
  {
    label: '40%',
    value: 'opacity-40',
  },
  {
    label: '50%',
    value: 'opacity-50',
  },
  {
    label: '60%',
    value: 'opacity-60',
  },
  {
    label: '70%',
    value: 'opacity-70',
  },
  {
    label: '75%',
    value: 'opacity-75',
  },
  {
    label: '80%',
    value: 'opacity-80',
  },
  {
    label: '90%',
    value: 'opacity-90',
  },
  {
    label: '95%',
    value: 'opacity-95',
  },
  {
    label: '100%',
    value: 'opacity-100',
  },
]


export const overflowList = [
  {
    label: '默认',
    value: '',
  },
  {
    label: '自动',
    value: 'overflow-auto',
  },
  {
    label: '隐藏',
    value: 'overflow-hidden',
  },
  {
    label: '可见',
    value: 'overflow-visible',
  },
  {
    label: '所有方向滚动',
    value: 'overflow-scroll',
  },
]

export const showList = [
  {
    label: '默认',
    value: '',
  },
  {
    label: 'block',
    value: 'block',
  },
  {
    label: 'inline-block',
    value: 'inline-block',
  },
  {
    label: 'flex',
    value: 'flex',
  },
  {
    label: 'hidden',
    value: 'hidden',
  },
]

export const customDirectiveList = [
  {
    label: '占据剩余高度',
    value: 'theRemainingHighly',
  },
]

export const textDecorationList = [
  {
    label: '去除装饰',
    value: '',
  },
  {
    label: '下划线',
    value: 'underline',
  },
  {
    label: '删除线',
    value: 'line-through',
  },
]

export const hoverTextDecorationList = [
  {
    label: '去除装饰',
    value: 'hover' + tailwind.separator + 'no-underline',
  },
  {
    label: '下划线',
    value: 'hover' + tailwind.separator + 'underline',
  },
  {
    label: '删除线',
    value: 'hover' + tailwind.separator + 'line-through',
  },
]

export const tabsPositionList = [
  {
    label: '顶部',
    value: 'top',
  },
  {
    label: '右侧',
    value: 'right',
  },
  {
    label: '底部',
    value: 'bottom',
  },
  {
    label: '左侧',
    value: 'left',
  },
]

export const objectFit = [
  {
    label: '包含',
    value: 'object-contain',
  },
  {
    label: '覆盖',
    value: 'object-cover',
  },
  {
    label: '填充',
    value: 'object-fill',
  },
  {
    label: '缩小',
    value: 'object-scale-down',
  },
]

export const styleHeightList = [
  {
    label: '铺满高度',
    value: 'h-full',
  },
  {
    label: '全屏高度',
    value: 'h-screen',
  },
  {
    label: '自适应高度',
    value: 'h-auto',
  },
]

export const stepsPositionList = [
  {
    label: '水平',
    value: 'horizontal',
  },
  {
    label: '垂直',
    value: 'vertical',
  },
]
 

//轮播图的初始化属性
export const carouselSettings = {
  accessibility: true,
  adaptiveHeight: false,
  arrows: true,
  asNavFor: null,
  autoplay: false,
  autoplaySpeed: 3000,
  centerMode: false,
  centerPadding: '50px',
  cssEase: 'ease',
  dots: false,
  dotsClass: 'slick-dots',
  draggable: true,
  edgeFriction: 0.35,
  fade: false,
  focusOnSelect: false,
  infinite: true,
  initialSlide: 0,
  lazyLoad: 'ondemand',
  pauseOnDotsHover: false,
  pauseOnFocus: false,
  pauseOnHover: true,
  responsive: [],
  rows: 1,
  rtl: false,
  slidesPerRow: 1,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  swipe: true,
  swipeToSlide: false,
  touchMove: true,
  touchThreshold: 5,
  useCSS: true,
  useTransform: true,
  variableWidth: false,
  vertical: false,
  waitForAnimate: true,
}

export const lazyLoad = [
  'ondemand',
  'progressive'
]

export const hoverTextColorList = hoverTextColorListVariable



export default {
  stylePulbicColor,
  textAlign,
  styleSpacingModel,
  borderList,
  borderRoundedList,
  controlType,
  styleFontWeight,
  animationTypeList,
  textTransform,
  componentList,
  paddingList,
  marginList,
  borderWidth,
  borderRounded,
  blockAlign,
  cursorList,
  shadowList,
  opacityList,
  showList,
  overflowList,
  textDecorationList,
  hoverTextDecorationList,
  hoverTextColorList,
  pcFieldName,
  ipadFieldName,
  mdFieldName,
  carouselSettings,
  lazyLoad,
  tabsPositionList,
  stepsPositionList,
  styleFlexDirection,
  styleJustifyContent,
  styleFlexAlignContent,
  styleColFlex,
  objectFit,
  styleHeightList,
  forFieldList,
  gradientList,
  customDirectiveList,
  styleFlexWrap,
}