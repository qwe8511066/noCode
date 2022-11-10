<template>
  <div>
    <el-form-item label="栅格类型" prop="title">
      <div class="el-form-item__content">
        <el-radio-group v-model="form.type">
          <el-radio-button
            :label="item.value"
            v-for="(item, index) in controlType"
            :key="index"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </div>
    </el-form-item>
    <el-form-item label="自定义类名">
      <el-input v-model="form.classes"></el-input>
    </el-form-item>
  </div>
</template>

<script>
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
export default {
  name: "setGuideContainerComponent",
  mixins: [setGuideComponentProperty],
  props: {},
  data() {
    return {
      controlType: this.$style.controlType
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
