<template>
  <div
    :class="[
      {
        layoutNestLayoutRoot: !colLayout
      }
    ]"
  >
    <div
      class=""
      :class="[{ 'md|space-y-30': layout, layoutNestLayoutChild: !colLayout }]"
    >
      <div class="mb-20" v-if="layout && colLayout">
        <el-button @click="addLayout(0)"> 添加布局 </el-button>
      </div>

      <div
        v-for="(item, index) in data"
        :style="[item.container.style]"
        :key="'container' + index"
        :class="[item.container.classes]"
      >
        <div
          class="relative"
          v-aos-animation:{value}="item.container.animation"
          :class="[
            cobyGuideComponentStyleClass(item.container),
            {
              'layout-container': layout
            },
            checkColLayoutClassContainer(item.container)
          ]"
          v-customePageContainer="layout"
          :style="[item.container.style]"
        >
          <div
            class="row flex relative"
            v-aos-animation:{value}="item.row.animation"
            :style="[item.row.style]"
            v-guideComponentDirective="
                      item.row.styleClass['customDirective']
                    "
            :class="[
              cobyGuideComponentStyleClass(item.row),
              item.row.classes,
              {
                'layout-row pt-40 overflow-auto md|flex-nowrap xl|flex-nowrap': layout
              }
            ]"
            v-customePageContainer="layout"
          >
            <div
              v-for="(col, i) in item.col"
              :style="[col.style]"
              v-guideComponentDirective="
                      col.styleClass['customDirective']
                    "
              class="relative col"
              :key="'col' + i"
              @click="clickRow(item, col, $event)"
              v-aos-animation:{value}="col.animation"
              :class="[
                col.classes,
                cobyGuideComponentStyleClass(col),
                {
                  'md|space-y-20 layout-col py-40 px-30 border-blue-700 border-2 border-dashed relative ': layout
                }
              ]"
              v-customePageContainer="layout"
            >
              <draggable
                v-if="col.layouts.length == 0"
                handle=".el-icon-s-unfold"
                v-bind="dragOptions"
                class="dragArea list-group"
                :list="col.colList"
                :id="col.id"
                :clone="cloneDog"
                @end="onEndClone"
              >
                <div
                  v-for="(box, index_1) in col.colList"
                  :key="'component' + index_1"
                  class="guideComponentParent"
                  :class="[
                    {
                      'mt-20': index_1 != 0 && layout,
                      'space-y-20 layout-col-component py-40 px-30 border-blue-400 border-2 border-dashed relative ': layout,
                      'border-pink-600': box.controlType === 'float' && layout
                    }
                  ]"
                >
                  <!-- 通用组件 start -->
                  <guideComponent
                    v-guideComponentDirective="
                      box.styleClass['customDirective']
                    "
                    :component-type="box.controlType"
                    :layout-nest-type="!colLayout"
                    v-aos-animation:{value}="box.animation"
                    :class="[cobyGuideComponentStyleClass(box)]"
                    :layout="layout"
                    :value="box"
                    ref="guideComponent"
                  ></guideComponent>
                  <!-- 通用组件 end -->

                  <!-- 设置ColComponent start -->
                  <div
                    v-if="layout"
                    style="margin-top: 0px"
                    class="set-attributes-col-component hidden place-items-center absolute top-5 left-5 space-x-10"
                  >
                    <span>{{ box.controlType }}</span>
                    <i
                      class="el-icon-s-tools text-lg cursor-pointer"
                      @click="setColComponent(box, index_1, col)"
                    ></i>
                    <i
                      class="el-icon-close text-lg cursor-pointer"
                      @click="
                        deleteContainerRow(
                          col,
                          index_1,
                          'component',
                          '删除组件',
                          '是否删除该组件'
                        )
                      "
                    ></i>
                    <i class="el-icon-s-unfold text-lg cursor-pointer"></i>
                    <i
                      class="el-icon-copy-document text-lg cursor-pointer"
                      @click="cobyComponent(box)"
                    ></i>
                  </div>

                  <!-- 设置ColComponent end -->
                </div>
              </draggable>

              <!-- 布局套布局 start -->
              <customePage
                v-if="col.layouts && col.layouts.length > 0"
                :data="col.layouts"
                :layout="layout"
                :key="'component' + col.layouts"
                :colLayout="false"
                :originalData="data"
              ></customePage>
              <!-- 布局套布局 end -->

              <!-- 设置Col start -->
              <div
                v-if="layout"
                class="set-attributes-col hidden place-items-center absolute top-0 left-2 space-x-10"
              >
                <span>col {{ i + 1 }}</span>
                <i
                  class="el-icon-s-tools text-lg cursor-pointer"
                  @click="setContainerRowTools(item, 'col', i, 4)"
                ></i>

                <i
                      class="el-icon-copy-document text-lg cursor-pointer"
                      @click="cobyComponent(col)"
                    ></i>

                <i
                  class="el-icon-document-add text-lg cursor-pointer"
                  slot="reference"
                  @click="pasteCobyComponent(item,i)"
                ></i>

                <i
                  class="el-icon-close text-lg cursor-pointer"
                  @click="
                    deleteContainerRow(
                      item,
                      i,
                      'col',
                      '清空Col',
                      '是否清空该Col'
                    )
                  "
                ></i>
              </div>
              <!-- 设置Col end -->

              <div class="space-y-20" v-if="layout">
                <div v-if="colLayout">
                  <el-button
                    type="primary"
                    class="w-full"
                    @click="addColLayot(col)"
                    plain
                    >添加布局</el-button
                  >
                </div>

                <div>
                  <el-button
                    type="primary"
                    class="w-full"
                    @click="addComponet(true, col)"
                    plain
                    >添加组件</el-button
                  >
                </div>
              </div>
            </div>

            <!-- 设置Row start -->
            <div
              v-if="layout"
              class="set-attributes-row hidden place-items-center absolute top-0 right-0 space-x-10"
            >
              <span>row</span>
              <i
                class="el-icon-s-tools text-lg cursor-pointer"
                @click="setContainerRowTools(item, 'row', index, 3)"
              ></i>
            </div>
            <!-- 设置Row end -->
          </div>

          <!-- 设置Container start -->

          <div
            v-if="layout"
            class="set-attributes-container hidden place-items-center absolute top-0 left-0 space-x-10"
          >
            <span>container</span>
            <span>{{ index + 1 }}</span>
            <i
              class="el-icon-s-tools text-lg cursor-pointer"
              v-if="colLayout"
              @click="setContainerRowTools(item, 'container', index, 2)"
            ></i>
            <i
              class="el-icon-close text-lg cursor-pointer"
              @click="
                deleteContainerRow(
                  item,
                  index,
                  'container',
                  '删除Container',
                  '是否删除第' + (index + 1) + '个Container?'
                )
              "
            ></i>
          </div>

          <!-- 设置Container end -->
        </div>
        <div class="mt-20" v-if="layout && colLayout">
          <el-button @click="addLayout(index + 1)"> 添加布局 </el-button>
        </div>
      </div>
    </div>

    <!-- 删除Container或清空Row -->
    <el-drawer
      v-if="layout"
      :title="deleteEmptyVisible.title"
      :visible.sync="deleteEmptyVisible.visible"
      :wrapperClosable="false"
    >
      <div class="h-full flex-col flex">
        <div class="flex p-20 text-2xl flex-grow justify-center items-center">
          {{ deleteEmptyVisible.text }}
        </div>
        <div class="flex p-20">
          <el-button @click="deleteEmptyVisible.visible = false" class="w-full"
            >关 闭</el-button
          >
          <el-button type="primary" class="w-full" @click="determineDelete"
            >确 定</el-button
          >
        </div>
      </div>
    </el-drawer>
    <!-- 删除Container或清空Row -->

    <!-- 粘贴复制的组件 -->
    <el-drawer
      v-if="layout"
      title="粘贴组件"
      :visible.sync="pasteVisibleData.visible"
      :wrapperClosable="false"
    >
      <div class="h-full flex-col flex  p-20">
        <el-form
          :model="pasteVisibleData.form"
          :rules="pasteVisibleData.rules"
          ref="pasteVisibleDataForm"
        >
          <el-form-item label="粘贴组件" prop="value">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="pasteVisibleData.form.value"></el-input>
          </el-form-item>
        </el-form>
        <div class="flex">
          <el-button @click="pasteVisibleData.visible = false" class="w-full"
            >关 闭</el-button
          >
          <el-button
            type="primary"
            class="w-full"
            @click="determinePasteCompoent"
            >确 定</el-button
          >
        </div>
      </div>
    </el-drawer>
    <!-- 删除Container或清空Row -->

    <!-- 添加组件 -->
    <el-drawer
      v-if="layout"
      title="请选择组件"
      :visible.sync="addComponeVisible"
      custom-class="layout-drawer"
    >
      <div class="px-10">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item
            :title="item.title"
            :name="String(index)"
            :key="index"
            v-for="(item, index) in componentList"
          >
            <div :key="i" v-for="(box, i) in item.list">
              <div
                v-if="!box.show"
                @click="addPageColComponent(box)"
                :class="[{ 'border-b-1': i != item.list.length - 1 }]"
                class="flex p-20 place-items-center cursor-pointer hover|bg-light hover|text-white"
              >
                <div class="flex-1 pl-20">
                  {{ box.title }}
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-drawer>
    <!-- 添加组件 -->

    <!-- 设置组件 -->
    <el-dialog
      width="80%"
      :close-on-click-modal="false"
      v-if="layout"
      :title="setComponeVisibleTitle"
      :visible.sync="setComponeVisible"
      v-dialogDrag
      :destroy-on-close="true"
      custom-class="myDialog"
    >
      <setGuidePublicComponent
        ref="setGuidePublicComponent"
        v-if="setComponeVisible"
        :value="col.component"
      ></setGuidePublicComponent>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setComponeVisible = false">关 闭</el-button>
        <el-button type="primary" @click="setGuidePublicComponentFinish"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 设置组件 -->

    <!-- 设置tabs子组件 -->
    <el-dialog
      width="80%"
      :close-on-click-modal="false"
      v-if="layout"
      :title="tabsContentComponentTitle"
      :visible.sync="tabsContentComponentVisible"
      v-dialogDrag
      :destroy-on-close="true"
      custom-class="myDialog"
    >
      <setGuidePublicComponent
        ref="setTabsGuidePublicComponent"
        v-if="tabsContentComponentVisible"
        :value="tabsContentComponent"
      ></setGuidePublicComponent>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setTabsGuidePublicComponentFinish(false)"
          >关 闭</el-button
        >
        <el-button
          type="primary"
          @click="setTabsGuidePublicComponentFinish(true)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 设置tabs子组件 -->

    <!-- 添加布局弹窗 -->
    <el-drawer
      title="请选择布局"
      v-if="layout"
      :visible.sync="layoutVisible"
      custom-class="layout-drawer"
    >
      <div class="px-10">
        <el-collapse v-model="activeLayoutName" accordion>
          <el-collapse-item
            :title="item.title"
            :name="String(index)"
            :key="'_layoutArray' + index"
            v-for="(item, index) in _layoutArray"
          >
            <div
              :key="'layoutList' + i"
              :class="[{ 'border-b-1': index != _layoutArray.length - 1 }]"
              class="flex p-20 place-items-center cursor-pointer hover|bg-light hover|text-white"
              @click="addPageLayout(box, i)"
              v-for="(box, i) in item.layoutList"
            >
              <div class="w-250 space-x-10 flex">
                <div
                  v-for="a in box.col.length"
                  :key="'layoutCol' + a"
                  class="h-40 flex-1 bg-primary "
                ></div>
              </div>
              <div class="flex-1 pl-20">col {{ box.col.length }}</div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-drawer>
    <!-- 添加布局弹窗 -->
  </div>
</template>

<script>
import eventEmiter from "@/utils/eventEmiter";
import draggable from "vuedraggable";
import guideComponent from "@/components/customePage/componentsIntercept/guideComponent/index";
import setGuidePublicComponent from "./setComponentTabs/index";
import { uuid } from "vue-uuid";
import customePage from "@/components/customePage/index";
import { initLayoutList, layoutArray } from "@/global/colLayout";
import lodash from "lodash";
import {
  checkArray,
  checkArrayString,
  guideComponentStyleClass,
  judgeStyleClass
} from "@/utils";
export default {
  name: "customePage",
  components: {
    guideComponent,
    draggable,
    customePage,
    setGuidePublicComponent
  },
  directives: {
    "aos-animation": {
      bind(el, binding, vnode, oldVnode) {
        vnode.context.setAttributeAos(el, binding.value);
      },
      update(el, binding, vnode, oldVnode) {
        vnode.context.setAttributeAos(el, binding.value);
      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  props: {
    //从父级获取的表单组件
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    //判断是否是设计
    layout: {
      type: Boolean,
      default: false
    },
    //col是否允许添加布局Layout
    colLayout: {
      type: Boolean,
      default: true
    },
    //最原始的data
    originalData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      //layout 的数据
      layoutList: [],
      //layout 的弹窗
      layoutVisible: false,
      _layoutArray: [],
      //是添加布局的位置
      layoutDataIndex: -1,
      //给对应的col添加布局
      layoutDataCol: null,

      styleFontSize: this.$style.styleFontSize,
      componentList: this.$style.componentList,

      deleteEmptyVisible: {
        title: "",
        visible: false,
        text: "",
        index: "",
        value: "",
        fieldName: ""
      },

      col: {
        index: "",
        list: [],
        // 0新增col  1修改col
        status: 0,
        component: ""
      },
      //粘贴弹窗
      pasteVisibleData: {
        visible: false,
        form: {
          value: ""
        },
        rules: {
          value: {
            required: true,
            message: "请选择活动区域",
            trigger: "change"
          }
        },
        value:null,
        index:null,
      },
      containerValue: "",

      addComponeVisible: false,
      setComponeVisible: false,
      setComponeVisibleTitle: "",
      activeName: "0",
      activeLayoutName: "0",
      dragCloneCol: "",

      tabsContentComponent: "",
      tabsContentComponentForm: "",
      tabsContentComponentStatus: "",
      tabsContentComponentTitle: "",
      tabsContentComponentVisible: false,
      tabsContentComponentIndex: -1
    };
  },
  watch: {},
  created() {
    eventEmiter.on("addTabsContentComponent", value => {
      const { item, status, form, index } = value;
      this.tabsContentComponentForm = form;
      this.tabsContentComponent = item;
      this.tabsContentComponentStatus = status;

      this.tabsContentComponentIndex = index;

      //新增打开选择弹窗
      if (status == 1) {
        this.addComponeVisible = true;
        this.filterComponentList(["tabs"]);
      } else {
        this.tabsContentComponentTitle =
          "新增tabs下的" + item.controlType + "子组件";
        this.tabsContentComponentVisible = true;
      }
    });
    this._layoutArray = layoutArray;
  },
  mounted() {
    this.upedataCarouselLastAsNavFor();
  },
  methods: {
    //初始化轮播图
    upedataCarouselLastAsNavFor() {
      const guideComponent = this.$refs.guideComponent;
      if (checkArray(this.data)) {
        this.data[0].col.forEach(element => {
          element.colList.forEach(box => {
            if (
              box.controlType == "carousel" &&
              typeof box.settings.asNavFor == "string"
            ) {
              let asNavFor = box.settings.asNavFor;
              const lastAsNavFor = asNavFor.substring(
                asNavFor.lastIndexOf(".") + 1
              );
              const guideComponentIndex = checkArrayString(
                guideComponent,
                "value.settings.ref",
                lastAsNavFor
              );
              box.settings.asNavFor =
                guideComponent[
                  guideComponentIndex
                ].$refs.guideComponentIndex.$refs[lastAsNavFor];
            }
          });
        });
      }
    },
    clickRow(row, box, event) {},
    setRow() {},
    addComponet(status, col) {
      this.col.list = col.colList;
      this.addComponeVisible = true;
      this.filterComponentList();
    },

    //新增布局
    addLayout(index) {
      this.layoutDataIndex = index;
      this.layoutVisible = true;
    },

    //给col 添加布局
    addColLayot(col) {
      this.layoutDataIndex = checkArray(col.layouts)
        ? col.layouts.length - 1
        : 0;
      this.layoutDataCol = col;
      this.layoutVisible = true;
    },

    //点击布局col 后
    addPageLayout(box, index) {
      // console.log(box)
      // console.log(index)
      const cobyCol = lodash.cloneDeep(box);
      cobyCol.col.forEach(element => {
        element.id = uuid.v4();
      });
      //col 布局
      if (this.layoutDataCol) {
        let layoutValue = lodash.cloneDeep(cobyCol);
        layoutValue.id = uuid.v4();
        this.lookingDataCol(this.data, this.layoutDataCol.id).layouts.push(
          layoutValue
        );
      } else {
        eventEmiter.emit("addPageLayout", [
          {
            value: lodash.cloneDeep(cobyCol),
            index: this.layoutDataIndex,
            layoutDataCol: this.layoutDataCol
          }
        ]);
      }
      this.layoutDataCol = null;
      this.layoutVisible = false;
    },

    //删除的弹窗
    deleteContainerRow(value, index, fieldName, title, text) {
      this.deleteEmptyVisible.fieldName = fieldName;
      this.deleteEmptyVisible.title = title;
      this.deleteEmptyVisible.text = text;
      this.deleteEmptyVisible.index = index;
      this.deleteEmptyVisible.value = value;
      this.deleteEmptyVisible.visible = true;
    },

    //确认删除
    determineDelete() {
      const index = this.deleteEmptyVisible.index;
      switch (this.deleteEmptyVisible.fieldName) {
        case "col":
          this.deleteEmptyVisible.value.col[
            this.deleteEmptyVisible.index
          ].colList = [];
          break;
        case "row":
          this.data[index].col = [];
          break;
        case "container":
          this.data.splice(index, 1);
          break;
        default:
          this.deleteEmptyVisible.value.colList.splice(index, 1);
          break;
      }
      this.deleteEmptyVisible.visible = false;
    },

    //添加组件
    addPageColComponent(value) {
      // console.log(value);
      const id = uuid.v4();
      //判断是否是tabs的子组件
      if (this.tabsContentComponentStatus) {
        this.tabsContentComponent = { ...value, id };
        this.tabsContentComponentTitle = "新增tabs的子组件";
        this.tabsContentComponentVisible = true;
      } else {
        this.col.component = { ...value, id };
        this.setComponeVisibleTitle = "设置组件";
        this.setComponeVisible = true;
        this.col.status = 0;

        //传递给轮播图组件
        if (value.controlType === "carousel") {
          this.$store.dispatch(
            "customPage/setCustomizepagesComponets",
            this.data
          );
        }
      }

      this.$nextTick(() => {
        setTimeout(() => {
          this.addComponeVisible = false;
        }, 33);
      });
    },

    //完成设置属性
    setGuidePublicComponentFinish() {
      const setGuideComponentForm = this.$refs.setGuidePublicComponent.$refs
        .setGuideComponentForm;
      setGuideComponentForm.validate(valid => {
        if (valid) {
          this.col.component = {
            ...this.col.component,
            ...setGuideComponentForm.model
          };
          switch (this.col.status) {
            //新增col
            case 0:
              this.col.list.push(this.col.component);
              break;
            //修改col
            case 1:
              this.col.list[this.col.index] = { ...this.col.component };
              break;
            //修改container
            case 2:
              this.containerValue.container = {
                ...this.containerValue.container,
                ...this.col.component
              };
              break;
            //修改Row
            case 3:
              this.containerValue.row = {
                ...this.containerValue.row,
                ...this.col.component
              };
              break;
            //修改col
            case 4:
              this.containerValue.col[this.col.index] = {
                ...this.containerValue.col[this.col.index],
                ...this.col.component
              };
              break;
          }
          this.setComponeVisible = false;
          this.col.component = {};

          if (setGuideComponentForm.model.controlType === "carousel") {
            this.$nextTick(() => {
              this.upedataCarouselLastAsNavFor();
            });
          }

          // console.log(JSON.stringify(this.data));
        }
      });
    },

    //选项卡的子组件
    setTabsGuidePublicComponentFinish(type) {
      const setTabsGuidePublicComponent = this.$refs.setTabsGuidePublicComponent
        .$refs.setGuideComponentForm;
      setTabsGuidePublicComponent.validate(valid => {
        if (valid) {
          this.tabsContentComponent = {
            ...this.tabsContentComponent,
            ...setTabsGuidePublicComponent.model
          };
          const componentsList = this.tabsContentComponentForm.componentsList[
            this.tabsContentComponentIndex
          ];
          switch (this.tabsContentComponentStatus) {
            case 1:
              componentsList.children.push(this.tabsContentComponent);
              break;

            default:
              const _childIndex = checkArrayString(
                componentsList.children,
                "id",
                this.tabsContentComponent.id
              );
              this.$set(
                componentsList.children,
                _childIndex,
                this.tabsContentComponent
              );
              break;
          }
        }
      });
      this.tabsContentComponentStatus = "";
      this.tabsContentComponentVisible = false;
    },

    //修改属性
    setColComponent(value, index, col) {
      this.col.list = col.colList;
      this.col.component = { ...value };
      this.col.index = index;
      this.col.status = 1;
      this.setComponeVisibleTitle = "设置组件";
      this.setComponeVisible = true;
    },

    //Container和Row 设置属性
    setContainerRowTools(value, valueField, index, status) {
      this.col.component = value[valueField];
      if (valueField == "col") {
        this.col.component = value[valueField][index];
      }
      this.containerValue = value;
      this.col.index = index;
      this.setComponeVisibleTitle = "设置" + valueField;
      this.col.status = status;
      this.setComponeVisible = true;
    },

    //组件的样式
    cobyGuideComponentStyleClass(value) {
      return guideComponentStyleClass(value);
    },

    //拖拽时
    cloneDog(e) {
      this.dragCloneCol = e;
    },

    //拖拽完成的
    onEndClone(e) {
      if (e.target.id != e.to.id) {
        const col = this.lookingDataCol(this.originalData, e.to.id);
        col.colList.splice(e.newIndex, 0, this.dragCloneCol);
      }
    },
    //设置aos 动画
    setAttributeAos(el, value) {
      //判断是否存在动画  不存在没必要设置属性
      if (value && value["dataAos"]) {
        this.setAttributeAosAnimation(el, "data-aos", value, "dataAos");
        this.setAttributeAosAnimation(
          el,
          "data-aos-delay",
          value,
          "dataAosDelay"
        );
        this.setAttributeAosAnimation(
          el,
          "data-aos-duration",
          value,
          "dataAosDuration"
        );
        this.setAttributeAosAnimation(
          el,
          "data-aos-offset",
          value,
          "dataAosOffset"
        );
        this.setAttributeAosAnimation(
          el,
          "data-aos-once",
          value,
          "dataAosOnce"
        );
      }
    },
    //设置aos 动画属性
    setAttributeAosAnimation(el, label, value, valueFieldName) {
      if (value) {
        el.setAttribute(label, value[valueFieldName]);
      }
    },

    /**
     * 过滤componentList
     */
    filterComponentList(array) {
      if (checkArray(array)) {
        this.componentList.forEach(item => {
          array.forEach(box => {
            const tabsIndex = checkArrayString(item.list, "controlType", box);
            if (tabsIndex != -1) {
              item.list[tabsIndex].show = true;
            }
          });
        });
      } else {
        this.componentList.forEach(item => {
          item.list.forEach(box => {
            box.show = false;
          });
        });
      }
    },

    //拷贝当前的组件
    cobyComponent(currentComponent) {
      const _self = this;
      this.$copyText(JSON.stringify(currentComponent)).then(
        () => {
          _self.$message.success(
            "复制" + currentComponent.controlType + "组件成功"
          );
        },
        () => {
          _self.$message.error("当前浏览器不支持复制");
        }
      );
    },

    //粘贴
    pasteCobyComponent(value,index) {
      this.pasteVisibleData.value = value;
      this.pasteVisibleData.index = index;
      this.pasteVisibleData.visible = true;
    },

    //确定粘贴组件
    determinePasteCompoent() {
      this.$refs["pasteVisibleDataForm"].validate(valid => {
        if (valid) {
          const value = JSON.parse(this.pasteVisibleData.form.value)
          if(value.controlType == 'col'){
            this.pasteVisibleData.value.col[this.pasteVisibleData.index] = value
          }else{
            this.pasteVisibleData.value.col[this.pasteVisibleData.index].colList.push(value)
          }
          this.pasteVisibleData.visible = false;
          this.$nextTick(()=>{
            this.pasteVisibleData.form.value = null;
          })
        }
      });
    },

    //校验container 的class
    checkColLayoutClassContainer(item) {
      return this.colLayout ? item.type : "";
    },

    //找data对应的col
    lookingDataCol(data, typeString) {
      if (checkArray(data)) {
        data.forEach(element => {
          for (let i = 0; i < element.col.length; i++) {
            const col = element.col[i];
            if (col.id == typeString) {
              this.layoutDataCol = col;
              break;
            }
            if (checkArray(col.layouts)) {
              this.lookingDataCol(col.layouts, typeString);
            }
          }
        });
      }
      return this.layoutDataCol;
    }
  }
};
</script>
<style scoped lang="scss">
.layout-container:hover {
  border-style: solid;
  .set-attributes-container {
    @extend .public-set-attributes;
  }
}
.layout-row:hover {
  border-style: solid;
  .set-attributes-row {
    @extend .public-set-attributes;
    margin-left: 0px;
  }
}

.layout-col:hover {
  border-style: solid;
  .set-attributes-col {
    margin: 0;
    @extend .public-set-attributes;
    margin-left: 0px;
  }
}

.layout-col-component:hover {
  border-style: solid;
  .set-attributes-col-component {
    @extend .public-set-attributes;
  }
}
.public-set-attributes {
  display: flex;
  color: white;
  background-color: #141414;
  height: auto !important;
  z-index: 2;
  flex-wrap: wrap;
}
</style>
