<template>
  <div>
    <el-form-item label="栅格宽度" prop="title">
      <div class="flex" v-for="(item, index) in fieldList" :key="index">
        <label class="w-250">{{ item.title }}</label>
        <el-slider
          class="flex-1 px-20"
          :min="0"
          :step="
            form.styleClass['' + item.spacingFieldName + ''] === 'grid' ? 1 : 2
          "
          :max="
            form.styleClass['' + item.spacingFieldName + ''] === 'grid'
              ? 12
              : 1000
          "
          v-model="form.styleClass['' + item.fieldName + '']"
          show-input
        ></el-slider>
        <div class="">
          <el-radio-group
            v-model="form.styleClass['' + item.spacingFieldName + '']"
          >
            <el-radio-button
              :label="item.value"
              v-for="(item, index) in styleSpacingModel"
              :key="index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="自定义类名">
      <el-input v-model="form.classes"></el-input>
    </el-form-item>

    <el-collapse accordion>
      <el-collapse-item title="放大和缩放(选中后宽度设置会不生效)">
        <el-form-item
          :label="item.title"
          v-for="(item, index) in colFlexList"
          :key="'colFlexList' + index"
        >
          <el-radio-group v-model="form.styleClass[item.fieldName]">
            <el-radio-button
              :label="box.value"
              v-for="(box, index) in styleColFlex"
              :key="'styleColFlex' + 'colFlexList' + index"
              >{{ box.label }}</el-radio-button
            >
          </el-radio-group>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>

  <el-collapse accordion> 
    <el-collapse-item title="col指令">
      <div class="el-form-item">
        <label class="el-form-item__label w-180">指令</label>
        <div class="el-form-item__content">
          <el-checkbox-group v-model="form.styleClass['customDirective']">
            <el-checkbox-button
              label="hoverColImgZoom"
              >划过col图片缩放</el-checkbox-button
            >
          </el-checkbox-group>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
  </div>
</template>

<script>
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
export default {
  name: "setGuideColComponent",
  mixins: [setGuideComponentProperty],
  props: {},
  data() {
    return {
      styleSpacingModel: this.$style.styleSpacingModel,
      styleColFlex: this.$style.styleColFlex,
      fieldList: [
        {
          title: "宽度",
          fieldName: "mobileWidth",
          spacingFieldName: "mobileWidthModel"
        },
        {
          title: "md模式下的宽度(screens->md)",
          fieldName: "mdWidth",
          spacingFieldName: "mdWidthModel"
        },
        {
          title: "电脑pc模式下的宽度(screens->xl)",
          fieldName: "desktopWidth",
          spacingFieldName: "desktopWidthModel"
        }
      ],
      colFlexList: [
        {
          title: "放大和缩小",
          fieldName: "mobileColFlex"
        },
        {
          title: "pad模式下的放大和缩小(screens->lg)",
          fieldName: "mdColFlex"
        },
        {
          title: "电脑pc模式下的放大和缩小(screens->xl)",
          fieldName: "desktopColFlex"
        }
      ]
    };
  },
  computed: {},
  created() {},
  methods: {
    //该组件的属性初始化 向父级发送信息  让父级去做对象的合并
    init() {}
  }
};
</script>

<style scoped></style>
