<script>
import lodash from "lodash";
import setGuideComponentProperty from "./setGuideComponentProperty";

import { checkcomponentsPath } from "@/components/customePage/componentsIntercept/checkPath";
//指引组件
// 传入组件类型  生成指定的组件
// 如传入类型：select   生成指定的select 组件
export default {
  render(h, cxt) {
    const path = checkcomponentsPath(this.value.path);
    try {
      // js的@/  指向不了对应的路径  这边得做替换
      return h(require("@/" + path + "setIndex").default, {
        props: {
          value: this.value,
          form: this.form
        }
      });
    } catch (error) {
      throw new Error("自定义页面设置组件找不到对应" + path + "setIndex的组件");
    }
  },
  mixins: [setGuideComponentProperty],
  methods: {
    //该组件的属性初始化 向父级发送信息  让父级去做对象的合并
    eventTheParentInit() {
      let initForm = {
        styleClass: {
          customDirective: []
        }
      };
      let initRules = {};
      const controlType = this.value.controlType;
      if (
        controlType === "collapse" ||
        controlType === "carousel" ||
        controlType === "steps" ||
        controlType === "tabs"
      ) {
        initForm.componentsList = this.form.componentsList
          ? this.form.componentsList
          : [];
        initForm.compontIndex = this.form.compontIndex
          ? this.form.compontIndex
          : 0;
      }

      switch (controlType) {
        case "row":
          initForm.styleClass.gridModel = this.form.styleClass.gridModel?this.form.styleClass.gridModel:'';
          
          break;
        case "view":
          if (this.form.requestObject) {
            initForm.requestObject = this.form.requestObject;
          } else {
            initForm.requestObject = {
              pageSize: 1,
              requestType: "",
              dataTemplate: `<div class=""><div v-for="(item,index) in this.dataList" :key="index">{{ item }}</div></div>`
            };
          }
          initRules["requestObject.requestType"] = [
            { required: true, message: "请选择分类", trigger: "change" }
          ];
          initRules["requestObject.pageSize"] = [
            { required: true, message: "请输入页码", trigger: "blur" }
          ];
          break;
        case "iconfont":
          initForm.fontFamily = this.form.fontFamily
            ? this.form.fontFamily
            : "icon";

          initRules.fontFamily = [{ required: true, message: "这是必填项" }];
          initRules.fontClass = [{ required: true, message: "这是必填项" }];
          break;
        case "float":
          initForm.styleClass.justifyContent = this.form.styleClass
            .justifyContent
            ? this.form.styleClass.justifyContent
            : "justify-center";
          initForm.styleClass.justifyItems = this.form.styleClass.justifyItems
            ? this.form.styleClass.justifyItems
            : "items-center";
          break;
        case "carousel":
          initForm.settings = this.form.settings
            ? this.form.settings
            : lodash.cloneDeep(this.$style.carouselSettings);
          break;
        case "imgae":
          initForm.styleClass.imgWidthModel = this.form.styleClass.imgWidthModel
            ? this.form.styleClass.imgWidthModel
            : "default";
          initForm.styleClass.objectFit = this.form.styleClass.objectFit
            ? this.form.styleClass.objectFit
            : "object-cover";
          initForm.styleClass.imgHeight = this.form.styleClass.imgHeight
            ? this.form.styleClass.imgHeight
            : "h-auto";

          initForm.imgUrl = this.form.imgUrl
            ? this.form.imgUrl
            : "https://images5.alphacoders.com/757/757038.jpg";
          initForm.skeleton = Boolean(this.form.skeleton)
            ? this.form.skeleton
            : false;
          break;

        case "steps":
          initForm.compontPosition = this.form.compontPosition
            ? this.form.compontPosition
            : "horizontal";
          break;

        case "tabs":
          initForm.compontPosition = this.form.compontPosition
            ? this.form.compontPosition
            : "top";
          break;

        case "title":
          initRules.title = [{ required: true, message: "这是必填项" }];
          break;
        case "video":
          initForm.videoSrc = this.form.videoSrc
            ? this.form.videoSrc
            : "http://vjs.zencdn.net/v/oceans.mp4";
          initRules.videoSrc = [{ required: true, message: "这是必填项" }];
          break;
      }
      this.$emit("eventTheParentInit", {
        form: initForm,
        rules: initRules
      });
    }
  },
  created() {
    this.eventTheParentInit();
  }
};
</script>

<style scoped lang="scss"></style>
