<template>
  <el-skeleton :loading="value.skeleton" :throttle="500" animated>
    <div class="guideComponentImageParent" :style="[value.style]">
      <div>

      
      <a
        v-if="value.link"
        :href="value.link"
        :target="value.target ? '_blank' : ''"
      >
        <imgaeDefault :value="value"></imgaeDefault>
      </a>
      <imgaeDefault v-else :value="value"></imgaeDefault>
      </div>
    </div>
  </el-skeleton>
</template>
<script>
import guideComponentProperty from "@/components/customePage/componentsIntercept/guideComponent/guideComponentProperty";
import imgaeDefault from "@/components/customePage/publicComponent/imgae/imgaeDefault";
export default {
  name: "customerPageImage",
  mixins: [guideComponentProperty],
  components: {
    imgaeDefault
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped></style>
