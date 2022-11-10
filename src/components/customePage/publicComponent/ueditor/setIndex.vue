<template>
  <div>
    <tinymce v-model="form.value" menubar="false" :height="360" />
  </div>
</template>

<script>
import tinymce from "@/components/Tinymce/index";
import setGuideComponentProperty from "@/components/customePage/componentsIntercept/setComponent/setGuideComponentProperty";
export default {
  name: "customerPageUeditor",
  mixins: [setGuideComponentProperty],
  props: {},
  data() {
    return {};
  },
  components: {
    tinymce
  },
  created() {},
  methods: {}
};
</script>

<style scoped></style>
