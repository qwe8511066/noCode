<template>
  <img
    :src="value.imgUrl"
    @load="loadImg"
    :class="[guideComponentStyleClass()]"
  />
</template>

<script>
import guideComponentProperty from "@/components/customePage/componentsIntercept/guideComponent/guideComponentProperty";
import { judgeStyleClass } from "@/utils";
export default {
  name: "customerPageImgaeDefault",
  mixins: [guideComponentProperty],
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    //组件的样式
    guideComponentStyleClass() {
      let list = [];
      if (
        this.value &&
        this.value.styleClass &&
        this.value.imgWidthModel != "default"
      ) {
        const styleClass = this.value.styleClass;
        const imgWidth = judgeStyleClass(styleClass, "imgWidth", "w-");
        const blockAlign = judgeStyleClass(styleClass, "blockAlign");
        const objectFit = judgeStyleClass(styleClass, "objectFit");
        const imgHeight = judgeStyleClass(styleClass, "imgHeight");

        const roundedTl = judgeStyleClass(styleClass, "roundedTl");
        const roundedTr = judgeStyleClass(styleClass, "roundedTr");
        const roundedBl = judgeStyleClass(styleClass, "roundedBl");
        const roundedBr = judgeStyleClass(styleClass, "roundedBr");

        list.push(
          imgWidth,
          blockAlign,
          objectFit,
          imgHeight,
          roundedTl,
          roundedTr,
          roundedBl,
          roundedBr
        );
      }
      return list.join(" ");
    },
    loadImg() {
      this.$set(this.value, "skeleton", false);
    }
  }
};
</script>

<style scoped></style>
