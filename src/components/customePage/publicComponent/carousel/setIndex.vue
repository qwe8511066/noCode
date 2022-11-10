<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="列表" name="0">
        <wyhElementTable
          ref="carouselWyhElementTable"
          :column="column"
          :list="form.componentsList"
        >
        </wyhElementTable>
        <div class="text-center">
          <el-button
            @click="addFormComponet('添加走马灯', 0, '')"
            plain
            class="mr-30"
            >新增</el-button
          >
        </div>
      </el-collapse-item>
      <el-collapse-item title="属性设置" name="1" v-if="judgeComponentsList()">
        <carouselAttributes
          :settings="form.settings"
          :refShow="true"
        ></carouselAttributes>
      </el-collapse-item>
      <el-collapse-item
        title="响应式属性设置"
        name="2"
        v-if="judgeComponentsList()"
      >
        <div class="mb-20">
          <el-button type="primary" @click="addResponsive">添 加</el-button>
        </div>

        <el-collapse
          class="p-20"
          v-model="activeNamesCollapse"
          v-if="form.settings.responsive && form.settings.responsive.length > 0"
        >
          <el-collapse-item
            v-for="(box, i) in form.settings.responsive"
            :key="'collapse' + i"
            :title="'响应式属性设置列表' + (i + 1)"
            :name="i"
          >
            <div class="flex items-center">
              <div class="mr-20">响应式属性设置列表</div>
              <div class="flex-1 mr-20">
                <el-input-number
                  v-model="form.settings.responsive[i].breakpoint"
                  @input="changeBreakpoint(form.settings.responsive[i])"
                  placeholder=""
                ></el-input-number>
              </div>
              <i
                class="el-icon-delete cursor-pointer"
                @click="deleteResponsive(i)"
              ></i>
            </div>
            <div class="mt-20" v-if="form.settings.responsive[i].breakpoint">
              <carouselAttributes
                :settings="form.settings.responsive[i].settings"
              ></carouselAttributes>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse>

    <!-- 走马灯弹窗 -->
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
    <!-- 走马灯弹窗 -->
  </div>
</template>

<script>
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
import carouselAttributes from "@/components/customePage/publicComponent/carousel/indexAttributes";
import tinymce from "@/components/Tinymce/index";
import { uuid } from "vue-uuid";
import lodash from "lodash";
export default {
  name: "customerPageCarousel",
  mixins: [setGuideComponentProperty],
  props: {},
  components: {
    tinymce,
    carouselAttributes
  },
  data() {
    return {
      activeNames: "0",
      activeNamesCollapse: "collapse0",
      dialogCollapse: {
        visible: false,
        title: "",
        value: {},
        type: ""
      },
      rules: {
        value: [{ required: true, message: "这是必填项" }]
      },
      column: [
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
                    this.addFormComponet("编辑走马灯", 1, scope.row)
                  }
                >
                  编辑
                </el-button>
                <el-button
                  type="text"
                  onClick={() =>
                    this.addFormComponet("查看走马灯", 2, scope.row)
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
  created() {
    setTimeout(() => {
      console.log(this.form);
    }, 333);
  },
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
          this.$refs.carouselWyhElementTable.forceRefreshTable();
          this.dialogCollapse.visible = false;
        }
      });
    },
    judgeComponentsList() {
      return this.form.componentsList && this.form.componentsList.length > 0;
    },
    //添加响应式属性设置
    addResponsive() {
      this.form.settings.responsive.push({});
    },
    //响应式宽度的设置
    changeBreakpoint(value) {
      if (value.breakpoint) {
        value.settings = value.settings
          ? value.settings
          : lodash.cloneDeep(this.$style.carouselSettings);
      } else {
        value.settings = null;
      }
    },
    deleteResponsive(index) {
      this.form.settings.responsive.splice(index, 1);
    }
  }
};
</script>

<style scoped></style>
