<template>
  <VueSlickCarousel
    v-if="valueWatch"
    :ref="value.settings.ref"
    v-bind="value.settings"
  >
    <div
      v-for="(item, index) in value.componentsList"
      :key="`VueSlickCarousel` + index"
      v-html="item.value"
    ></div>
  </VueSlickCarousel>
</template>

<script>
import guideComponentProperty from "@/components/customePage/componentsIntercept/guideComponent/guideComponentProperty";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import VueSlickCarousel from "vue-slick-carousel";
export default {
  name: "customerPageCarousel",
  mixins: [guideComponentProperty],
  components: { VueSlickCarousel },
  props: {},
  data() {
    return {
      activeNames: "0",
      valueWatch: true
    };
  },
  watch: {
    value: {
      handler(newName, oldName) {
        this.valueWatch = false;
        this.$nextTick(() => {
          this.valueWatch = true;
        });
      }
    }
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style scoped></style>
