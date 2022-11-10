<template>
  <div>
    <el-form-item label="视频地址" prop="videoSrc">
      <el-input v-model="form.videoSrc"></el-input>
    </el-form-item>
    <el-form-item label="播放前所显示的图像">
      <el-input v-model="form.videoPoster"></el-input>
    </el-form-item>
    <el-form-item label="自动播放">
      <el-switch v-model="form.styleClass['autoplay']"></el-switch>
    </el-form-item>
    <el-form-item label="播放后再次开始播放">
      <el-switch v-model="form.styleClass['loop']"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
export default {
  name: "customerPageVideo",
  mixins: [setGuideComponentProperty],
  props: {},
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {}
};
</script>

<style scoped></style>
