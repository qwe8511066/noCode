<template>
  <div>
    <el-skeleton :loading="!dataList || dataList.length == 0" animated>
      <customerPageViewDefault
        :dataList="dataList"
        :value="value"
        :dataTemplate="value.requestObject.dataTemplate"
        v-if="dataList && dataList.length > 0"
      >
      </customerPageViewDefault>
    </el-skeleton>
  </div>
</template>
<script>
import guideComponentProperty from "@/components/customePage/componentsIntercept/guideComponent/guideComponentProperty";
import customerPageViewDefault from "./viewDefault";
export default {
  name: "customerPageView",
  mixins: [guideComponentProperty],
  components: { customerPageViewDefault },
  props: {},
  data() {
    return {
      dataList:[],
    };
  },
  computed: {},
  created() {
    this.init();
  },
  watch: {
    "value.requestObject": {
      handler: function() {
        this.init()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    init() {
      this.dataList = [];
      this.$http
        .post(this.value.requestObject.requestType, {
          pageSize: this.value.requestObject.pageSize
        })
        .then(data => {
          setTimeout(() => {
            const { list } = data.data;
            this.dataList = list;
          }, 1111);
        });
    }
  }
};
</script>

<style scoped></style>
