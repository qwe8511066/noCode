<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="flexBox">
            <div class="flex1">设计页面</div>

            <div v-if="data && data.length > 0">
              <el-button size="mini" @click="savaData()">保存</el-button>
              <el-button size="mini" @click="customizePagePreview()"
                >预览</el-button
              >
            </div>
          </div>

          <div class="">
            <customePage
              :data="data"
              :layout="true"
              :originalData="data"
            ></customePage>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Affix from "easy-affix";
import customePage from "@/components/customePage/index";
import eventEmiter from "@/utils/eventEmiter";
import { uuid } from "vue-uuid";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import VueSlickCarousel from "vue-slick-carousel";
import { initLayoutList,layoutArray } from "@/global/colLayout";
import { checkArray } from '@/utils';
export default {
  name: "customPage",
  components: {
    Affix,
    customePage,
    draggable,
    VueSlickCarousel
  },
  data() {
    return {
      data: [],

      //写死的数据
      pageList:this.$page.pageList
    };
  },
  created() {
    //添加布局
    eventEmiter.on("addPageLayout", data => {
      let { value, index } = data;
      value.id = uuid.v4();
      this.data.splice(index, 0, value);
    });
    this.init();

    if(checkArray(layoutArray[0].layoutList) == 0){
      initLayoutList();
    }
    console.log(JSON.stringify(this.data))
  },

  mounted() {},
  computed: {},
  methods: {
    savaData() {
      const key = "customPage" + this.$route.params.id;
      window.localStorage.setItem(key, JSON.stringify(this.data));
      this.$message("保存成功");
    },
    init() {
      
      const id = this.$route.params.id;
      const key = "customPage" + id;
      const data = window.localStorage.getItem(key);
      //保存在浏览器上的数据
      if (data) {
        this.data = eval(data);
      }else{
        
        //拿写死的数据
        this.data = this.pageList[id]?this.pageList[id].data:[]
      }
    },
    customizePagePreview() {
      this.savaData();
      this.$router.push("/customizePagePreview/" + this.$route.params.id);
    }
  }
};
</script>
<style lang="scss"></style>
