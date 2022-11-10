<template>
  <el-collapse
    v-model="activeNames"
    :style="[value.style]"
    :accordion="value.accordion"
  >
    <el-collapse-item
      v-for="(item, index) in value.componentsList"
      :key="'collapseList' + index"
      :title="item.title"
      :name="index"
    >
      <div v-html="item.value"></div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import guideComponentProperty from "@/components/customePage/componentsIntercept/guideComponent/guideComponentProperty";
export default {
  name: "customerPageCollapse",
  mixins: [guideComponentProperty],
  props: {},
  data() {
    return {
      activeNames: "0"
    };
  },
  computed: {},
  created() {},
  methods: {
    outPutForm() {}
  }
};
</script>

<style scoped></style>
