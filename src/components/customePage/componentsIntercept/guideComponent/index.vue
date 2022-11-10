<script>
import guideComponentProperty from "./guideComponentProperty";
import { checkcomponentsPath } from "@/components/customePage/componentsIntercept/checkPath";
//指引组件
// 传入组件类型  生成指定的组件
// 如传入类型：select   生成指定的select 组件
export default {
  render(h, cxt) {
    const path = checkcomponentsPath(this.value.path);
    try {
      // js的@/  指向不了对应的路径  这边得做替换
      return h(require("@/" + path + "index").default, {
        props: {
          value: this.value,
          layout: this.layout
        },
        ref: "guideComponentIndex"
      });
    } catch (error) {
      throw new Error("自定义页面显示组件找不到对应" + path + "index的组件");
    }
  },
  mixins: [guideComponentProperty],
  methods: {},
  created() {}
};
</script>

<style scoped lang="scss"></style>
