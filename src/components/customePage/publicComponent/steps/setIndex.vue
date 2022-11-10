<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="列表" name="0">
        <wyhElementTable
          ref="stepsWyhElementTable"
          :column="column"
          :list="form.componentsList"
        >
        </wyhElementTable>
        <div class="text-center">
          <el-button
            @click="addFormComponet('添加选项卡', 0, '')"
            plain
            class="mr-30"
            >新增</el-button
          >
        </div>
      </el-collapse-item>
      <el-collapse-item title="属性设置" name="1" v-if="judgeComponentsList()">
        <el-form
          :model="form"
          label-width="150px"
          class="customerForm"
          label-position="right"
        >
          <el-form-item label="默认展示的索引" class="myField" mycol="3">
            <el-select v-model="form.compontIndex" placeholder="索引">
              <el-option
                :label="'第' + (index + 1) + '个'"
                :value="index"
                v-for="(item, index) in form.componentsList.length"
                :key="'tabsComponentsList' + index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显示方向" class="myField" mycol="3">
            <el-select v-model="form.compontPosition" placeholder="显示方向">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in stepsPositionList"
                :key="'stepsPositionList' + index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <!-- 选项卡弹窗 -->
    <el-dialog
      width="80%"
      :close-on-click-modal="false"
      v-if="dialogCollapse.visible"
      :title="dialogCollapse.title"
      :visible.sync="dialogCollapse.visible"
      v-dialogDrag
      :append-to-body="true"
      custom-class="myDialog"
    >
      <el-form
        :model="dialogCollapse.value"
        :rules="rules"
        ref="customerPageCollapseForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="dialogCollapse.value.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="value">
          <tinymce
            v-model="dialogCollapse.value.value"
            menubar="false"
            :height="360"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCollapse.visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveFormComponet"
          v-if="dialogCollapse.type != 2"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 选项卡弹窗 -->
  </div>
</template>

<script>
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
import tinymce from "@/components/Tinymce/index";
import { uuid } from "vue-uuid";
export default {
  name: "customerPageSteps",
  mixins: [setGuideComponentProperty],
  props: {},
  components: {
    tinymce
  },
  data() {
    return {
      activeNames: "0",
      stepsPositionList: this.$style.stepsPositionList,
      dialogCollapse: {
        visible: false,
        title: "",
        value: {},
        type: ""
      },
      rules: {
        title: [{ required: true, message: "这是必填项" }]
      },
      column: [
        {
          prop: "title",
          label: "标题"
        },
        {
          prop: "value",
          label: "内容"
        },
        {
          label: "操作",
          render: (h, scope) => {
            return (
              <div class="buttonDivide">
                <el-button
                  type="text"
                  onClick={() =>
                    this.addFormComponet("编辑选项卡", 1, scope.row)
                  }
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  onClick={() =>
                    this.addFormComponet("查看选项卡", 2, scope.row)
                  }
                >
                  查看
                </el-button>
                <el-button
                  type="text"
                  onClick={() =>
                    this.form.componentsList.splice(scope.$index, 1)
                  }
                >
                  删除
                </el-button>
              </div>
            );
          }
        }
      ]
    };
  },
  computed: {},
  created() {},
  methods: {
    addFormComponet(title, type, value) {
      this.dialogCollapse.value = value
        ? value
        : { title: "", value: "", id: uuid.v4() };
      this.dialogCollapse.title = title;
      this.dialogCollapse.type = type;
      this.dialogCollapse.visible = true;
    },
    saveFormComponet() {
      const customerPageCollapseForm = this.$refs.customerPageCollapseForm;
      customerPageCollapseForm.validate(valid => {
        if (valid) {
          if (this.dialogCollapse.type == 0) {
            this.form.componentsList.push(customerPageCollapseForm.model);
          } else {
            this.form.value = {
              ...this.form.value,
              ...customerPageCollapseForm.model
            };
          }
          this.dialogCollapse.visible = false;

          this.$refs.stepsWyhElementTable.forceRefreshTable();
        }
      });
    },
    judgeComponentsList() {
      return this.form.componentsList && this.form.componentsList.length > 0;
    }
  }
};
</script>

<style scoped></style>
