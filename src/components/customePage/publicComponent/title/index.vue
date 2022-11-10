<template>
  <div class="" :style="[value.style]">
    <a
      v-if="value.link"
      :href="value.link"
      :class="[guideComponentStyleClass()]"
      :target="value.target ? '_blank' : ''"
    >
      {{ value.title }}
    </a>
    <span v-else :class="[guideComponentStyleClass()]">{{ value.title }}</span>
  </div>
</template>

<script>
import guideComponentProperty from "@/components/customePage/componentsIntercept/guideComponent/guideComponentProperty";
import { judgeStyleClass } from "@/utils";
export default {
  name: "customerPageTitle",
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
    guideComponentStyleClass() {
      let list = [];
      if (this.value && this.value.styleClass) {
        const styleClass = this.value.styleClass;
        const hoverTextColor = judgeStyleClass(styleClass, "hoverTextColor");
        const cursor = judgeStyleClass(styleClass, "cursor");
        const hoverTextDecoration = judgeStyleClass(
          styleClass,
          "hoverTextDecoration"
        );
        list.push(hoverTextColor, cursor, hoverTextDecoration);
      }
      return list.join(" ");
    }
  }
};
</script>

<style scoped></style>
