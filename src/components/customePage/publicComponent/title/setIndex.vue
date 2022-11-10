<template>
  <div>
    <el-form-item label="标题内容" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="跳转链接">
      <el-input v-model="form.link"></el-input>
    </el-form-item>
    <el-form-item label="是否跳转外部链接" v-if="form.link">
      <el-switch v-model="form.target"></el-switch>
      {{ form.target ? "是" : "否" }}
    </el-form-item>

    <el-form-item label="鼠标效果">
      <el-radio-group v-model="form.styleClass['cursor']">
        <el-radio-button
          :label="item.value"
          v-for="(item, index) in cursorList"
          :key="'cursor' + index"
          >{{ item.label }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>

    <el-form-item label="鼠标滑过修改文本装饰">
      <el-radio-group v-model="form.styleClass['hoverTextDecoration']">
        <el-radio-button
          :label="item.value"
          v-for="(item, index) in hoverTextDecorationList"
          :key="'hoverTextDecoration' + index"
          >{{ item.label }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>

    <el-form-item label="鼠标滑过修改文本颜色">
      <el-radio-group v-model="form.styleClass['hoverTextColor']">
        <el-radio
          border
          :label="item.value"
          :style="{ 'background-color': item.label }"
          v-for="(item, index) in hoverTextColorList"
          :key="'hoverTextColor' + index"
          >{{ item.label }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
  </div>
</template>

<script>
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
export default {
  name: "setCustomerPageTitle",
  mixins: [setGuideComponentProperty],
  props: {},
  data() {
    return {
      cursorList: this.$style.cursorList,
      hoverTextDecorationList: this.$style.hoverTextDecorationList,
      hoverTextColorList: this.$style.hoverTextColorList
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style scoped></style>
