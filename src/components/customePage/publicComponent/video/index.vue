<template>
  <video
    class="w-full"
    muted 
    :src="value.videoSrc"
    controls="controls"
    :poster="value.videoPoster"
    :loop="value.styleClass.loop"
    :autoplay="value.styleClass.autoplay"
  ></video>
</template>

<script>
import guideComponentProperty from "@/components/customePage/componentsIntercept/guideComponent/guideComponentProperty";
export default {
  name: "customerPageVideo",
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
