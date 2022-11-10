<template>
  <div class="flex" :style="[value.style]">
    <div class="">
      <span
        :class="[
          value.fontFamily,
          value.fontClass,
          guideComponentStyleClass(value)
        ]"
      ></span>
    </div>
    <div
      v-if="value && value.value"
      class="flex-1 pl-5"
      v-html="value.value"
    ></div>
  </div>
</template>

<script>
import guideComponentProperty from "@/components/customePage/componentsIntercept/guideComponent/guideComponentProperty";
import { judgeStyleClass } from "@/utils";
export default {
  name: "customerPageIconfont",
  mixins: [guideComponentProperty],
  props: {},
  data() {
    return {};
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
        this.$style.forFieldList.forEach(item => {
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
          list.push(fontSize);
        });
      }
      return list.join(" ");
    }
  }
};
</script>

<style scoped></style>
