<template>
  <el-form
    label-position="right"
    class="customerForm "
    label-width="150px"
    :model="settings"
  >
    <el-form-item class="myField" mycol="3" label="accessibility">
      <el-switch v-model="settings.accessibility"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="adaptiveHeight">
      <el-switch v-model="settings.adaptiveHeight"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="arrows">
      <el-switch v-model="settings.arrows"> </el-switch>
    </el-form-item>
    <el-form-item
      class="myField"
      mycol="3"
      label="asNavFor"
      v-if="carouselComponets && carouselComponets.length > 0"
    >
      <el-select
        v-model="settings.asNavFor"
        placeholder="联动的轮播图"
        clearable
      >
        <el-option
          :label="item.settings.ref"
          :value="'$refs.' + item.settings.ref"
          v-for="(item, index) in carouselComponets"
          :key="'carouselComponets' + index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="ref">
      <el-input v-model="settings.ref"></el-input>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="autoplay">
      <el-switch v-model="settings.autoplay"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="autoplaySpeed">
      <el-input-number v-model="settings.autoplaySpeed"></el-input-number>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="centerMode">
      <el-switch v-model="settings.centerMode"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="centerPadding">
      <el-input v-model="settings.centerPadding"></el-input>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="cssEase">
      <el-input v-model="settings.cssEase"></el-input>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="dots">
      <el-switch v-model="settings.dots"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="dotsClass">
      <el-input v-model="settings.dotsClass"> </el-input>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="draggable">
      <el-switch v-model="settings.draggable"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="edgeFriction">
      <el-input-number v-model="settings.edgeFriction"> </el-input-number>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="fade">
      <el-switch v-model="settings.fade"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="focusOnSelect">
      <el-switch v-model="settings.focusOnSelect"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="infinite">
      <el-switch v-model="settings.infinite"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="initialSlide">
      <el-input-number v-model="settings.initialSlide"> </el-input-number>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="lazyLoad">
      <el-select v-model="settings.lazyLoad" placeholder="设置延迟加载技术">
        <el-option
          :label="item"
          :value="item"
          v-for="(item, index) in lazyLoad"
          :key="'settingsLazyLoad' + index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="pauseOnDotsHover">
      <el-switch v-model="settings.pauseOnDotsHover"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="pauseOnFocus">
      <el-switch v-model="settings.pauseOnFocus"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="pauseOnHover">
      <el-switch v-model="settings.pauseOnHover"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="rows">
      <el-input-number v-model="settings.rows"> </el-input-number>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="rtl">
      <el-switch v-model="settings.rtl"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="slidesPerRow">
      <el-input-number v-model="settings.slidesPerRow"> </el-input-number>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="slidesToScroll">
      <el-input-number v-model="settings.slidesToScroll"> </el-input-number>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="slidesToShow">
      <el-input-number v-model="settings.slidesToShow"> </el-input-number>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="speed">
      <el-input-number v-model="settings.speed"> </el-input-number>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="swipe">
      <el-switch v-model="settings.swipe"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="swipeToSlide">
      <el-switch v-model="settings.swipeToSlide"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="touchMove">
      <el-switch v-model="settings.touchMove"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="touchThreshold">
      <el-input-number v-model="settings.touchThreshold"> </el-input-number>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="useCSS">
      <el-switch v-model="settings.useCSS"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="useTransform">
      <el-switch v-model="settings.useTransform"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="variableWidth">
      <el-switch v-model="settings.variableWidth"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="vertical">
      <el-switch v-model="settings.vertical"> </el-switch>
    </el-form-item>
    <el-form-item class="myField" mycol="3" label="waitForAnimate">
      <el-switch v-model="settings.waitForAnimate"> </el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
import store from "@/store";
import { checkArray } from "@/utils";
export default {
  name: "customerPageCarouselAttributes",
  mixins: [],
  props: {
    settings: {
      type: Object
    },
    refShow: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      lazyLoad: this.$style.lazyLoad,
      carouselComponets: []
    };
  },
  computed: {},
  created() {
    store.getters.customizepagesComponets.forEach(element => {
      element.col.forEach(item => {
        if (checkArray(item.colList)) {
          const list = item.colList.filter(box => {
            return box.controlType === "carousel" && box.settings.ref;
          });
          this.carouselComponets = [...this.carouselComponets, ...list];
        }
      });
    });
  },
  methods: {}
};
</script>

<style></style>
