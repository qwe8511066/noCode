<template>
  <div>
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="图片" prop="imgUrl">
      <el-input v-model="form.imgUrl"></el-input>
    </el-form-item>
    <el-form-item label="跳转链接">
      <el-input v-model="form.link"></el-input>
    </el-form-item>
    <el-form-item label="是否跳转外部链接" v-if="form.link">
      <el-switch v-model="form.target"></el-switch>
      {{ form.target ? "是" : "否" }}
    </el-form-item>
  </div>
</template>

<script>
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
export default {
  name: "setCustomerPageImage",
  mixins: [setGuideComponentProperty],
  props: {},
  data() {
    return {
      styleSpacingModel: this.$style.styleSpacingModel,
      blockAlign: this.$style.blockAlign,
      objectFit: this.$style.objectFit,
      styleHeightList: this.$style.styleHeightList
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style scoped></style>
