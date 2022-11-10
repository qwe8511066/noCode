<template>
  <div>
    <el-form-item  label="水平对齐">
      <el-radio-group v-model="form.styleClass['justifyContent']">
        <el-radio-button
          :label="box.value"
          v-for="(box, index) in styleJustifyContent"
          :key="'floatComponentStyleJustifyContent' + index"
          >{{ box.label }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>

    <el-form-item  label="垂直对齐">
      <el-radio-group v-model="form.styleClass['justifyItems']">
        <el-radio-button
          :label="box.value"
          v-for="(box, index) in styleFlexAlignContent"
          :key="'styleFlexAlignContent' + 'alignItemsList' + index"
          >{{ box.label }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>
 
    <tinymce v-model="form.value" menubar="false" :height="360" /> 
  </div>
</template>

<script>
import tinymce from "@/components/Tinymce/index";
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
export default {
  name: "setGuideFloatComponent",
  mixins: [setGuideComponentProperty],
  props: {},
  components: {
    tinymce,
  },
  data() {
    return {
      styleJustifyContent: this.$style.styleJustifyContent,
      styleFlexAlignContent: this.$style.styleFlexAlignContent
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style scoped></style>
