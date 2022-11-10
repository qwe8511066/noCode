<template>
  <div>
    <el-form-item label="图片" prop="imgUrl">
      <el-input v-model="form.imgUrl"></el-input>
    </el-form-item>
    <el-form-item label="开启骨架">
      <el-switch v-model="form.skeleton"></el-switch>
    </el-form-item>
    <el-form-item label="宽度">
      <div class="flex">
        <el-slider
          v-if="form.styleClass['imgWidthModel'] != 'default'"
          class="flex-1 px-20"
          :min="form.styleClass['imgWidthModel'] === 'grid' ? 1 : 0"
          :step="form.styleClass['imgWidthModel'] === 'grid' ? 1 : 5"
          :max="form.styleClass['imgWidthModel'] === 'grid' ? 12 : 1000"
          v-model="form.styleClass['imgWidth']"
          show-input
        ></el-slider>
        <div class="">
          <el-radio-group v-model="form.styleClass['imgWidthModel']">
            <el-radio-button
              :label="item.value"
              v-for="(item, index) in styleSpacingModel"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
            <el-radio-button label="default">默认</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="跳转链接">
      <el-input v-model="form.link"></el-input>
    </el-form-item>
    <el-form-item label="是否跳转外部链接" v-if="form.link">
      <el-switch v-model="form.target"></el-switch>
      {{ form.target ? "是" : "否" }}
    </el-form-item>

    <el-form-item label="图片方向">
      <el-radio-group v-model="form.styleClass['blockAlign']">
        <el-radio-button
          :label="item.value"
          v-for="(item, index) in blockAlign"
          :key="'blockAlign' + index"
          >{{ item.label }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>

    <el-form-item label="图片大小">
      <el-radio-group v-model="form.styleClass['objectFit']">
        <el-radio-button
          :label="item.value"
          v-for="(item, index) in objectFit"
          :key="'objectFit' + index"
          >{{ item.label }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>

    <el-form-item label="图片高度">
      <el-radio-group v-model="form.styleClass['imgHeight']">
        <el-radio-button
          :label="item.value"
          v-for="(item, index) in styleHeightList"
          :key="'styleHeightList' + index"
          >{{ item.label }}</el-radio-button
        >
      </el-radio-group>
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
