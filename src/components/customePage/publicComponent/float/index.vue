<template>
  <div class="inset-0 absolute z-1" >
    <div class="flex w-full h-full relative " :class="[guideComponentStyleClass()]">
    <div class="" v-html="value.value"></div></div>
  </div>
</template>

<script>
import guideComponentProperty from "@/components/customePage/componentsIntercept/guideComponent/guideComponentProperty";
import { judgeStyleClass } from "@/utils";
export default {
  name: "customerPageFloat",
  mixins: [guideComponentProperty],
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    //组件的样式
    guideComponentStyleClass() {
      let list = [];
      if (this.value && this.value.styleClass) {
        const styleClass = this.value.styleClass;
        const justifyContent = judgeStyleClass(styleClass, "justifyContent");
        const justifyItems = judgeStyleClass(styleClass, "justifyItems");
        list.push(justifyContent, justifyItems);
      }
      return list.join(" ");
    }
  }
};
</script>

<style scoped></style>
