<template>
  <div>
    <el-form-item label="高度">
      <el-slider
        class="flex-1 px-20"
        :min="0"
        :max="scssVariables._height"
        v-model="form.styleClass['mobileHeight']"
        show-input
      ></el-slider>
    </el-form-item>

    <el-form-item label="md模式的高度">
      <el-slider
        class="flex-1 px-20"
        :min="0"
        :max="scssVariables._height"
        v-model="form.styleClass['mdHeight']"
        show-input
      ></el-slider>
    </el-form-item>
  </div>
</template>

<script>
import _scssVariables from "root/tailwind.variables.config.js"
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
export default {
  name: "customerPageSpacer",
  mixins: [setGuideComponentProperty],
  props: {},
  data() {
    return {
      scssVariables:_scssVariables
    };
  },
  components: {
    
  },
  created() {
    console.log(this.scssVariables)
  },
  methods: {}
};
</script>

<style scoped></style>
