<template>
  <div v-html="value.value"></div>
</template>

<script>
import guideComponentProperty from "@/components/customePage/componentsIntercept/guideComponent/guideComponentProperty";
export default {
  name: "customerPageUeditor",
  mixins: [guideComponentProperty],
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style scoped></style>
