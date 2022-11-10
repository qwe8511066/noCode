
import lodash from "lodash";
//布局的col数
// export const layoutArray = [1, 2, 3, 4, 6]
export const layoutArray = [
  {
    title: "栅格布局",
    list: [1, 2, 3, 4, 6],
    type: 'grid',
    layoutList: [],
  },
  {
    title: "弹性盒子布局(每块占比为1)",
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    type: 'flex',
    layoutList: [],
  },
]
const _container = {
  controlType: "container",
  path: "@/components/customePage/publicComponent/container/",
  classes: "",
  //对应的类型：
  //container、container-lg、container-md、container-sm、container-xs
  type: "container",
  animation: {},
}
const _row = {
  controlType: "row",
  path: "@/components/customePage/publicComponent/row/",
  classes: "",
  styleClass: {
    rowWidthModel: "grid",
    rowWidth: 12,

    mobileFlexDirection: "flex-col",
    mdFlexDirection: "flex-row",
    desktopFlexDirection: "flex-row",

    mobileJustifyContent: "justify-start",
    mdJustifyContent: "justify-start",
    desktopJustifyContent: "justify-start",

    mobileItemsContent: "items-stretch",
    mdItemsContent: "items-stretch",
    desktopItemsContent: "items-stretch",

    mobileSpaceX: 0,
    mdSpaceX: 0,
    desktopSpaceX: -1,

    mobileSpaceY: 0,
    mdSpaceY: 0,
    desktopSpaceY: -1,

    mobileFlexWrap:'flex-wrap', 
    mdFlexWrap:'flex-nowrap',
    desktopFlexWrap:'flex-nowrap',

  },
  animation: {},
}
const _col = {
  classes: "",
  colList: [],
  controlType: "col",
  path: "@/components/customePage/publicComponent/col/",
  layouts: [],
  styleClass: {
    desktopWidthModel: "grid",
    desktopWidth: 12,
    mdWidthModel: "grid",
    mdWidth: 12,
    mobileWidthModel: "grid",
    mobileWidth: 12,
    mobileColFlex: "",
    mdColFlex: "",
    desktopColFlex: "",
  },
  animation: {},
}



export function initLayoutList() {
  // let layoutList = []
  // for (let index = 0; index < layoutArray.length; index++) {
  //   let col = [];
  //   const desktopType = 12 / layoutArray[index];
  //   for (let i = 0; i < layoutArray[index]; i++) {
  //     const cobyCol = lodash.cloneDeep(_col)
  //     cobyCol.styleClass.desktopWidth = desktopType;
  //     cobyCol.styleClass.mdWidth = desktopType;
  //     col.push(cobyCol);
  //   }
  //   layoutList.push({
  //     container: _container,
  //     row: _row,
  //     col: col,
  //   });
  // }
  layoutArray.forEach((item, index) => { 
    item.list.forEach((box, i) => { 
      let col = [];
      const desktopType = 12 / box;
      for (let a = 0; a < box; a++) {
        const cobyCol = lodash.cloneDeep(_col)
        switch (item.type) {
          case 'grid':
            //grid 每块赋予对应的百分比宽度 
            cobyCol.styleClass.desktopWidth = desktopType;
            cobyCol.styleClass.mdWidth = desktopType;
            break;

          case 'flex':
            cobyCol.styleClass.mobileColFlex = '';
            cobyCol.styleClass.mdColFlex = 'flex-1';
            cobyCol.styleClass.desktopColFlex = 'flex-1';
            break;
        }
        col.push(cobyCol)
      }
      item.layoutList.push({
        container: _container,
        row: _row,
        col: col,
      })
    })
  })
}