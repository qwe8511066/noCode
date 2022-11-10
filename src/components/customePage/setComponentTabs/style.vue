<template>
  <el-collapse accordion>
    <el-collapse-item title="背景" v-if="judgePrefixField()">
      <el-form-item label="背景颜色">
        <el-color-picker
          v-model="form.style.backgroundColor"
          :show-alpha="true"
          :predefine="stylePulbicColor"
        ></el-color-picker>
      </el-form-item>

      <el-form-item label="伪类背景颜色渐变色">
        <el-radio-group v-model="form.styleClass['gradient']">
          <el-radio
            border
            :label="item.value"
            :class="item.label"
            v-for="(item, index) in gradientList"
            :key="'gradient' + index"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
    </el-collapse-item>

    <el-collapse-item title="文本">
      <el-form-item label="文字颜色" v-if="judgePrefixField()">
        <el-color-picker
          v-model="form.style.color"
          :predefine="stylePulbicColor"
        ></el-color-picker>
      </el-form-item>

      <el-form-item label="文字大小" v-if="judgeContainerOrRow()">
        <div class="">
          <el-slider
            v-if="judgePrefixField()"
            class="flex-1 mr-20"
            :min="12"
            :step="2"
            :max="72"
            v-model="form.styleClass[prefixField + 'fontSize']"
            show-input
          ></el-slider>

          <div v-else class="flex px-10">
            <el-slider
              v-if="form.styleClass[prefixField + 'typeFontSize']"
              class="flex-1 mr-20"
              :min="12"
              :step="2"
              :max="72"
              v-model="form.styleClass[prefixField + 'fontSize']"
              show-input
            ></el-slider>

            <div>
              <el-switch
                v-if="!judgePrefixField()"
                v-model="form.styleClass[prefixField + 'typeFontSize']"
              >
              </el-switch>
              {{
                form.styleClass[prefixField + "typeFontSize"]
                  ? ""
                  : prefixField + "模式下设置文字大小"
              }}
            </div>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="字体粗细" v-if="judgePrefixField()">
        <el-radio-group v-model="form.styleClass['fontWeight']">
          <el-radio-button
            :label="item.value"
            v-for="(item, index) in styleFontWeight"
            :key="'fontWeight' + index"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="溢出行数(超出多少行显示...)"
        v-if="judgePrefixField()"
      >
        <el-radio-group v-model="form.styleClass['textLimit']">
          <el-radio-button label="">默认</el-radio-button>
          <el-radio-button
            :label="item"
            v-for="item in 10"
            :key="'textLimit' + item"
            >{{ item }}行</el-radio-button
          >
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文本转换" v-if="judgePrefixField()">
        <el-radio-group v-model="form.styleClass['textTransform']">
          <el-radio-button
            :label="item.value"
            v-for="(item, index) in textTransform"
            :key="'textTransform' + index"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文本装饰" v-if="judgePrefixField()">
        <el-radio-group v-model="form.styleClass['textDecoration']">
          <el-radio-button
            :label="item.value"
            v-for="(item, index) in textDecorationList"
            :key="'textDecoration' + index"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文字方向">
        <el-radio-group v-model="form.styleClass[prefixField + 'textAlign']">
          <el-radio-button
            :label="item.value"
            v-for="(item, index) in textAlign"
            :key="'textAlign' + index"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
    </el-collapse-item>

    <el-collapse-item title="间距">
      <div class="el-form-item">
        <label class="el-form-item__label">内间距(Padding)</label>
        <div class="space-y-20">
          <div
            class="el-form-item__content"
            v-for="(box, i) in paddingList"
            :key="'spacingPadding' + i"
          >
            <div class="flex">
              <label class="w-180">{{ box.title }}</label>
              <el-slider
                class="flex-1 px-20"
                :min="0"
                :step="
                  form.styleClass[
                    '' + prefixField + box.spacingFieldName + ''
                  ] === 'grid'
                    ? 1
                    : 2
                "
                :max="
                  form.styleClass[
                    '' + prefixField + box.spacingFieldName + ''
                  ] === 'grid'
                    ? 11
                    : scssVariables._spacing
                "
                v-model="form.styleClass['' + prefixField + box.fieldName + '']"
                show-input
              ></el-slider>
              <div class="">
                <el-radio-group
                  v-model="
                    form.styleClass[
                      '' + prefixField + box.spacingFieldName + ''
                    ]
                  "
                >
                  <el-radio-button
                    :label="item.value"
                    v-for="(item, index) in styleSpacingModel"
                    :key="'styleSpacingModel' + index"
                    >{{ item.label }}</el-radio-button
                  >
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="el-form-item">
        <label class="el-form-item__label">外间距(Margin)</label>
        <div class="space-y-20">
          <div
            class="el-form-item__content"
            v-for="(box, i) in marginList"
            :key="'spacingPadding' + i"
          >
            <div class="flex">
              <label class="w-180">{{ box.title }}</label>
              <el-slider
                class="flex-1 px-20"
                :min="
                  form.styleClass[
                    '' + prefixField + box.spacingFieldName + ''
                  ] === 'grid'
                    ? 0
                    : -scssVariables._spacing
                "
                :step="
                  form.styleClass[
                    '' + prefixField + box.spacingFieldName + ''
                  ] === 'grid'
                    ? 1
                    : 2
                "
                :max="
                  form.styleClass[
                    '' + prefixField + box.spacingFieldName + ''
                  ] === 'grid'
                    ? 11
                    : scssVariables._spacing
                "
                v-model="form.styleClass['' + prefixField + box.fieldName + '']"
                show-input
              ></el-slider>
              <div class="">
                <el-radio-group
                  v-model="
                    form.styleClass[
                      '' + prefixField + box.spacingFieldName + ''
                    ]
                  "
                >
                  <el-radio-button
                    :label="item.value"
                    v-for="(item, index) in styleSpacingModel"
                    :key="'styleSpacingModel' + index"
                    >{{ item.label }}</el-radio-button
                  >
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-item>

    <el-collapse-item title="边框" v-if="judgePrefixField()">
      <div class="el-form-item">
        <label class="el-form-item__label">边框宽度</label>
        <div class="space-y-20">
          <div
            class="el-form-item__content"
            v-for="(item, index) in borderWidth"
            :key="'styleBorder' + index"
          >
            <div class="flex">
              <label class="mr-20">{{ item.title }}</label>
              <el-slider
                class="flex-1 px-20"
                :min="0"
                :max="6"
                v-model="form.styleClass['' + item.fieldName + '']"
                show-input
              ></el-slider>
            </div>
          </div>
        </div>
      </div>

      <div class="el-form-item">
        <label class="el-form-item__label">边框圆角</label>

        <div class="space-y-20">
          <div
            class="el-form-item__content"
            v-for="(item, index) in borderRounded"
            :key="'borderRounded' + index"
          >
            <div class="flex">
              <label class="mr-20">{{ item.title }}</label>
              <el-radio-group
                class="flex-1"
                v-model="form.styleClass['rounded' + item.fieldName]"
              >
                <el-radio-button
                  :label="
                    box
                      ? 'rounded' + item.borderFieldName + '-' + box
                      : 'rounded' + item.borderFieldName
                  "
                  v-for="(box, i) in borderRoundedList"
                  :key="'borderRoundedModel' + i"
                >
                  {{ box ? box : "默认" }}
                </el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>

      <el-form-item label="边框样式">
        <el-radio-group v-model="form.styleClass['borderStyle']">
          <el-radio-button
            :label="item.value"
            v-for="(item, index) in borderList"
            :key="'borderStyle' + index"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>

      <el-form-item label="边框颜色">
        <el-color-picker
          v-model="form.style['border-color']"
          :predefine="stylePulbicColor"
        ></el-color-picker>
      </el-form-item>
    </el-collapse-item>
    <el-collapse-item title="阴影" v-if="judgePrefixField()">
      <div class="el-form-item">
        <label class="el-form-item__label w-180">阴影</label>
        <div class="el-form-item__content">
          <el-radio-group v-model="form.styleClass['shadow']">
            <el-radio-button
              :label="item.value"
              v-for="(item, index) in shadowList"
              :key="'shadow' + index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </div>
      </div>
    </el-collapse-item>

    <el-collapse-item title="透明度" v-if="judgePrefixField()">
      <div class="el-form-item">
        <label class="el-form-item__label w-180">透明度</label>
        <div class="el-form-item__content">
          <el-radio-group v-model="form.styleClass['opacity']">
            <el-radio-button
              :label="item.value"
              v-for="(item, index) in opacityList"
              :key="'opacity' + index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </div>
      </div>
    </el-collapse-item>

    <el-collapse-item title="可见性">
      <div class="el-form-item">
        <label class="el-form-item__label w-180">可见性</label>
        <div class="el-form-item__content">
          <el-radio-group v-model="form.styleClass[prefixField + 'show']">
            <el-radio-button
              :label="item.value"
              v-for="(item, index) in showList"
              :key="'show' + index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </div>
      </div>
    </el-collapse-item>

    <el-collapse-item title="溢出" v-if="judgePrefixField()">
      <div class="el-form-item">
        <label class="el-form-item__label w-180">溢出</label>
        <div class="el-form-item__content">
          <el-radio-group v-model="form.styleClass['overflow']">
            <el-radio-button
              :label="item.value"
              v-for="(item, index) in overflowList"
              :key="'overflow' + index"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </div>
      </div>
    </el-collapse-item>

    <el-collapse-item title="指令" v-if="judgePrefixField()">
      <div class="el-form-item">
        <label class="el-form-item__label w-180">指令</label>
        <div class="el-form-item__content">
          <el-checkbox-group v-model="form.styleClass['customDirective']">
            <el-checkbox-button
              :label="item.value"
              v-for="(item, index) in customDirectiveList"
              :key="'customDirective' + index"
              >{{ item.label }}</el-checkbox-button
            >
          </el-checkbox-group>
        </div>
      </div>
    </el-collapse-item>

    <el-collapse-item title="动画" v-if="judgePrefixField()">
      <div class="el-form-item">
        <label class="el-form-item__label w-180">动画类型</label>
        <el-select
          v-model="form.animation['dataAos']"
          placeholder="请选择动画类型"
        >
          <el-option
            v-for="(item, index) in animationTypeList"
            :key="'dataAos' + index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="el-form-item">
        <label class="el-form-item__label w-180">触发动画的偏移量(px)</label>
        <el-input-number
          v-model="form.animation['dataAosOffset']"
          :min="1"
          :max="300"
        >
        </el-input-number>
      </div>

      <div class="el-form-item">
        <label class="el-form-item__label w-180">延迟时间(毫秒)</label>
        <el-input-number
          v-model="form.animation['dataAosDelay']"
          :min="0"
          :max="10000"
        >
        </el-input-number>
      </div>

      <div class="el-form-item">
        <label class="el-form-item__label w-180">持续时间(毫秒)</label>
        <el-input-number
          v-model="form.animation['dataAosDuration']"
          :min="0"
          :max="10000"
        >
        </el-input-number>
      </div>

      <div class="el-form-item">
        <label class="el-form-item__label w-180">只触发一次</label>
        <el-switch v-model="form.animation['dataAosOnce']">{{
          form.animation["dataAosOnce"] ? "是" : "否"
        }}</el-switch>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import _scssVariables from "root/tailwind.variables.config.js"
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
export default {
  name: "setGuideStyleComponent",
  mixins: [setGuideComponentProperty],
  props: {
    prefixField: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      scssVariables:_scssVariables,
      gradientList: this.$style.gradientList,
      stylePulbicColor: this.$style.stylePulbicColor,
      textAlign: this.$style.textAlign,
      styleSpacingModel: this.$style.styleSpacingModel,
      borderList: this.$style.borderList,
      borderRoundedList: this.$style.borderRoundedList,
      styleFontWeight: this.$style.styleFontWeight,
      animationTypeList: this.$style.animationTypeList,
      textTransform: this.$style.textTransform,
      paddingList: this.$style.paddingList,
      marginList: this.$style.marginList,
      borderWidth: this.$style.borderWidth,
      borderRounded: this.$style.borderRounded,
      blockAlign: this.$style.blockAlign,
      shadowList: this.$style.shadowList,
      opacityList: this.$style.opacityList,
      showList: this.$style.showList,
      textDecorationList: this.$style.textDecorationList,
      overflowList: this.$style.overflowList,
      customDirectiveList: this.$style.customDirectiveList,
    };
  },
  created() {},

  computed: {},
  methods: {
    //判断Container 或者Row
    judgeContainerOrRow() {
      return !(
        this.form.controlType == "container" || this.form.controlType == "row"
      );
    },

    //判断prefixField
    judgePrefixField() {
      return !this.prefixField;
    }
  }
};
</script>

<style scoped></style>
