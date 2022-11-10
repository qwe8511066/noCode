<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="列表" name="0">
        <wyhElementTable
          tableAlign="left"
          ref="tabsWyhElementTable"
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
          <el-form-item label="所在位置" class="myField" mycol="3">
            <el-select v-model="form.compontPosition" placeholder="所在位置">
              <el-option
                :label="item.label"
                :value="item.value"
                v-for="(item, index) in tabsPositionList"
                :key="'tabsPositionList' + index"
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCollapse.visible = false">关 闭</el-button>
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
import eventEmiter from "@/utils/eventEmiter";
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
import carouselAttributes from "@/components/customePage/publicComponent/carousel/indexAttributes";
import tinymce from "@/components/Tinymce/index";
import { uuid } from "vue-uuid";
import lodash from "lodash";
import { checkArrayString } from "@/utils";
export default {
  name: "customerPageTabs",
  mixins: [setGuideComponentProperty],
  props: {},
  components: {
    tinymce,
    carouselAttributes
  },
  data() {
    return {
      activeNames: "0",
      tabsPositionList: this.$style.tabsPositionList,
      dialogCollapse: {
        visible: false,
        title: "",
        value: {},
        type: ""
      },
      componentsListIndex: 0,
      rules: {
        title: [{ required: true, message: "这是必填项" }],
        value: [{ required: true, message: "这是必填项" }]
      },
      column: [
        {
          prop: "title",
          label: "标题"
        },
        {
          prop: "controlType",
          label: "组件类型"
        },
        {
          type: "buttons",
          label: "操作",
          buttons: [
            {
              //按钮隐藏或展示
              iif: scope => !scope.row.controlType,
              text: "新增子组件",
              click: (scope, modal) => {
                this.addTabsContentComponent(scope.row, 1);
              }
            },
            {
              //按钮隐藏或展示
              iif: scope => scope.row.controlType,
              text: "修改组件",
              click: (scope, modal) => {
                this.addTabsContentComponent(scope.row, 2);
              }
            },

            {
              iif: scope => !scope.row.controlType,
              text: "编辑",
              click: (scope, modal) => {
                this.addFormComponet("编辑选项卡", 1, scope.row);
              }
            },
            {
              iif: scope => !scope.row.controlType,
              text: "删除tab",
              click: (scope, modal) => {
                this.form.componentsList.splice(
                  this.getComponentIndex(scope.row.id).parentIndex,
                  1
                );
              }
            },
            {
              iif: scope => scope.row.controlType,
              text: "删除组件",
              click: (scope, modal) => {
                const value = this.getComponentIndex(scope.row.id, false);
                this.form.componentsList[value.parentIndex].children.splice(
                  value.childIndex,
                  1
                );
              }
            }
          ]
        }
      ]
    };
  },
  computed: {},
  created() {},
  methods: {
    addFormComponet(title, type, value) {
      if (value) {
        this.componentsListIndex = this.getComponentIndex(value.id).parentIndex;
        this.dialogCollapse.value = lodash.cloneDeep(value);
      } else {
        this.componentsListIndex = this.form.componentsList.length - 1;
        this.dialogCollapse.value = { title: "", children: [], id: uuid.v4() };
      }
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
            this.$set(
              this.form.componentsList,
              this.componentsListIndex,
              customerPageCollapseForm.model
            );
          }
          this.dialogCollapse.visible = false;
        }
        this.$refs.tabsWyhElementTable.forceRefreshTable();
      });
    },
    judgeComponentsList() {
      return this.form.componentsList && this.form.componentsList.length > 0;
    },

    /**
     * tabsItem tabs子组件对象
     * status 1添加 2修改
     * index 当前数组的索引
     */
    addTabsContentComponent(tabsItem, status) {
      this.componentsIndex = this.getComponentIndex(
        tabsItem.id,
        status === 1 ? true : false
      ).parentIndex;
      eventEmiter.emit("addTabsContentComponent", [
        {
          form: this.form,
          item: tabsItem,
          status: status,
          index: this.componentsIndex
        }
      ]);
    },
    getComponentIndex(id, parentType = true) {
      let value = {
        parentIndex: "",
        childIndex: ""
      };
      if (parentType) {
        value.parentIndex = checkArrayString(
          this.form.componentsList,
          "id",
          id
        );
      } else {
        for (let index = 0; index < this.form.componentsList.length; index++) {
          const _childIndex = checkArrayString(
            this.form.componentsList[index].children,
            "id",
            id
          );
          console.log(_childIndex);
          if (_childIndex != -1) {
            value.childIndex = _childIndex;
            //父级的index
            value.parentIndex = index;
            break;
          }
        }
      }
      return value;
    }
  }
};
</script>

<style scoped></style>
