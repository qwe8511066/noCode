<template>
  <div class="pagePreview">
    <customePage :data="data"></customePage>
  </div>
</template>

<script>
import customePage from "@/components/customePage/index";

export default {
  name: "customizePagePreview",
  components: {
    customePage
  },
  data() {
    return {
      data: [],
      visible: false
    };
  },
  created() {
    this.init();
  },

  mounted() {},
  computed: {},
  methods: {
    init() {
      const key = "customPage" + this.$route.params.id;
      const data = window.localStorage.getItem(key);
      if (data) {
        this.data = eval(data);
      }
    }
  }
};
</script>
<style lang="scss"></style>
