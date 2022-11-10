<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="组件属性" name="0">
      <el-form
        ref="setGuideComponentForm"
        :rules="rules"
        label-position="top"
        :model="form"
      >
        <setGuideComponent
          @eventTheParentInit="eventTheParentInit"
          :value="value"
          :form="form"
        ></setGuideComponent>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="组件样式->手机模式" name="1" :lazy="true">
      <el-form
        ref="setGuideStyleComponentForm"
        :rules="rules"
        label-position="top"
        :model="form"
      >
        <setGuideStyleComponent :form="form"></setGuideStyleComponent>
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="组件样式->md模式(md)" name="2" :lazy="true">
      <el-form
        ref="setGuideStyleComponentFormLg"
        :rules="rules"
        label-position="top"
        :model="form"
      >
        <setGuideStyleComponent
          :form="form"
          :prefixField="mdFieldName"
        ></setGuideStyleComponent>
      </el-form>
    </el-tab-pane>

    <!-- <el-tab-pane label="组件样式->pad模式(lg)" name="3" :lazy="true">
      <el-form
        ref="setGuideStyleComponentFormMd"
        :rules="rules"
        label-position="top"
        :model="form"
      >
        <setGuideStyleComponent
          :form="form"
          :prefixField="ipadFieldName"
        ></setGuideStyleComponent>
      </el-form>
    </el-tab-pane> -->

    <el-tab-pane label="组件样式->电脑pc模式(xl)" name="4" :lazy="true">
      <el-form
        ref="setGuideStyleComponentFormXl"
        :rules="rules"
        label-position="top"
        :model="form"
      >
        <setGuideStyleComponent
          :form="form"
          :prefixField="pcFieldName"
        ></setGuideStyleComponent>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import setGuideComponent from "@/components/customePage/componentsIntercept/setComponent/index";
import setGuideStyleComponent from "./style";
import lodash from "lodash";
export default {
  name: "setGuidePublicComponent",
  props: {
    value: {
      type: Object
    }
  },
  mixins: [],
  components: {
    setGuideComponent,
    setGuideStyleComponent
  },
  data() {
    return {
      pcFieldName: this.$style.pcFieldName,
      ipadFieldName: this.$style.ipadFieldName,
      mdFieldName: this.$style.mdFieldName,

      form: {
        //用于直接设置style 背景颜色和字体颜色
        style: {},
        //用于直接设置字体大小 边框 间距这类class
        styleClass: {
        },
        
        // requestObject:{
        //   dataTemplate:`<div class=""><div v-for="(item,index) in this.dataList" :key="index">{{ item }}</div></div>`
        // },

        animation: {
          dataAosOffset: 120,
          dataAosDelay: 0,
          dataAosDuration: 1000,
          dataAosOnce: false
        }
      },
      rules: {},
      activeName: "0"
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    //接收到组件属性初始化的请求 合并对象
    eventTheParentInit(value) {
      this.form =
        value && value.form
          ? lodash.merge(lodash.cloneDeep(this.form), value.form)
          : this.form;
      this.rules =
        value && value.rules ? { ...this.rules, ...value.rules } : this.rules;
    },
    //合并从外层获取的value对象
    init() {
      this.form = this.value ? { ...this.form, ...this.value } : this.form;
      this.setFieldPublicName();
      this.eventTheParentInit();
    },

    //各种模式的默认值
    setFieldPublicName() {
      const spacingModel = [
        "paddingLeftModel",
        "paddingTopModel",
        "paddingRightModel",
        "paddingBottomModel",
        "marginLeftModel",
        "marginTopModel",
        "marginRightModel",
        "marginBottomModel"
      ];
      const styleClass = this.form.styleClass;
      this.$style.forFieldList.forEach(item => {
        styleClass[item + "fontSize"] = styleClass[item + "fontSize"]
          ? styleClass[item + "fontSize"]
          : 16;
        spacingModel.forEach(box => {
          styleClass[item + box] = styleClass[item + box]
            ? styleClass[item + box]
            : "";
        });
      });
    }
  }
};
</script>

<style scoped></style>
