<template>
  <div :class="[guideComponentStyleClass(value)]"  :style="[value.style]"></div>
</template>

<script>
import guideComponentProperty from "@/components/customePage/componentsIntercept/guideComponent/guideComponentProperty";
import { judgeStyleClass } from "@/utils";
export default {
  name: "customerPageSpacer",
  mixins: [guideComponentProperty],
  props: {},
  data() {
    return {
       mdFieldName: this.$style.mdFieldName,
    };
  },
  computed: {},
  created() {},
  methods: {
    outPutForm() {},
    //组件的样式
    guideComponentStyleClass(value) {
      let list = [];
      if (value && value.styleClass) {
        const styleClass = value.styleClass;
        // this.$style.forFieldList.forEach(item => {
        //   let fontSize = judgeStyleClass(
        //     styleClass,
        //     item + "fontSize",
        //     "text-",
        //     item
        //   );
        //   //判断是否修改文字大小
        //   if (item) {
        //     fontSize = styleClass[item + "typeFontSize"] ? fontSize : "";
        //   }
        //   list.push(fontSize);
        // });
        let mdHeight =
          this.mdFieldName + judgeStyleClass(styleClass, "mdHeight", "h-");

        let mobileHeight = judgeStyleClass(styleClass, "mobileHeight", "h-");
        list.push(mdHeight, mobileHeight);
      }
      return list.join(" ");
    }
  }
};
</script>

<style scoped></style>
