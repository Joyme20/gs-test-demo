<template>
  <div class="demo-wrapper">
    <viewer-wrapper elementId="viewer" style="flex: 1" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import GsHeader from "@/components/gs-header.vue";
import { Options } from "../../../bimAir/src/gsDevFx/options";

import BimAir, { Viewer } from "../../../bimAir/src/index";

Vue.use(BimAir.ViewerWrapper);

@Component({
  components: {
    // GsHeader,
    // BimAir
  },
})
export default class Index extends Vue {
  options: Options = {
    elementId: "viewer",
    background: "linear-gradient(#e3fcfc, #f6ffff)",
    isShowLoading: true,
  };

  viewer: Viewer;

  mounted() {
    BimAir.Loader({
      isShareArrayBuffer: false,
    }).then(() => {
      let viewer = new BimAir.Viewer(this.options);
      viewer.instanceObjectSegment.renderingOptions.LogarithmicDepthBuffer =
        true;

      viewer
        .loadModels(
          [
            {
              id: this.$route.query.modelId as string,
              version: Number(this.$route.query.version),
            },
          ],
          true,
          true
        )
        .then((lightModels) => {});
    });
  }

  beforeDestory() {
    this.viewer.dispose();
  }
}
</script>

<style scoped lang="scss">
.demo-wrapper {
  display: flex;
  flex: 1;
}
</style>
