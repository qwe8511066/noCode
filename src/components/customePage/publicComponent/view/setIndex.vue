<template>
  <div>
    <div class="flex">
      <div class="w-4/12">
        <el-form-item label="请选择分类" prop="requestObject.requestType">
          <el-select
          :clearable="true"
            filterable
            v-model="form.requestObject['requestType']"
            placeholder="请选择"
          >
            <el-option-group
              v-for="group in getViewList"
              :key="group.label"
              :label="group.label"
            >
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入页码" prop="requestObject.pageSize">
          <el-input-number
            v-model="form.requestObject['pageSize']"
            :min="1"
            :max="20"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="视图模板">
          <el-input
            type="textarea"
            :rows="2"
            autosize
            placeholder="请输入视图模板"
            v-model="form.requestObject['dataTemplate']"
          >
          </el-input>
        </el-form-item>
      </div>

      <div class="flex-1" v-if="data && data.length > 0">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>字段名称</span>
          </div>

          <div v-for="(value, key) in data[0]" :key="key">
            <p>字段名:{{ key }}</p>
          </div>
        </el-card>
      </div>
    </div>

    <div v-if="dataList && dataList.length > 0">
      <code-viewer
        v-if="code_example"
        ref="codeViewer"
        :showCode="true"
        :source="code_example"
      >
      </code-viewer>
    </div>
  </div>
</template>

<script>
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
export default {
  name: "setCustomerViewComponent-list-1-0",
  mixins: [setGuideComponentProperty],
  components: {},
  props: {},
  data() {
    return {
      getViewList: this.$API.getViewList,
      data: [],
      //测试数据
      dataList: [],
      code_example: null
    };
  },
  watch: {
    "form.requestObject": {
      handler: function() {
        this.onSubmit();
      },
      immediate: true,
      deep: true
    }
  },

  created() {},
  methods: {
    getDataList(value) {
      this.dataList = value;
      this.code_example =
        `
    <template>
      <div id="` +
        this.value.controlType +
        this.value.id +
        `">
      </div>
    </template>
    <script>
    export default {
        data() {
          return {
            dataList:` +
        JSON.stringify(this.dataList) +
        `,
            dataTemplate:` +
        JSON.stringify(this.form.requestObject.dataTemplate) +
        `,
            startTime: +new Date(),
          };
        },
        created() {
          this.jsonData()
        },
        methods: {
          jsonData(){
            this.dataList =  this.dataList&& (new Function("","return "+this.dataList))();
            this.dataTemplate = this.dataTemplate&& (new Function("","return "+this.dataTemplate))();
          }
        },
      };
    <\/script>`;
    },
    onSubmit() {
      if (this.form.requestObject && this.form.requestObject.requestType) {
        this.$http
          .post(this.form.requestObject.requestType, {
            pageSize: this.form.requestObject.pageSize
          })
          .then(data => {
            const { list } = data.data;
            this.getDataList(list);
            this.data = list;
          });
      }
    }
  }
};
</script>

<style scoped></style>
