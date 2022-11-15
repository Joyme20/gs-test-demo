<template>
  <div class="demo-wrapper">
    <viewer-wrapper elementId="viewer" style="flex: 1" />
    <viewer-wrapper elementId="viewer2" style="flex: 1" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import GsHeader from "@/components/gs-header.vue";
// import { Options } from "../../../bimAir/src/gsDevFx/options";

import BimAir, { Viewer } from "gs-bim-air";

Vue.use(BimAir.ViewerWrapper);

@Component({
  components: {
    // GsHeader,
    // BimAir
  },
})
export default class Index extends Vue {
  options = {
    elementId: "viewer",
    background: "linear-gradient(#e3fcfc, #f6ffff)",
    isShowLoading: true,
  };

  options2 = {
    elementId: "viewer2",
    background: "linear-gradient(#e3fcfc, #f6ffff)",
    isShowLoading: true,
  };

  viewer: Viewer;
  viewer2: Viewer;

  mounted() {
    BimAir.Loader({
      isShareArrayBuffer: true,
    }).then(() => {
      let viewer = new BimAir.Viewer(this.options);
      let viewer2 = new BimAir.Viewer(this.options2);
      //   viewer.instanceObjectSegment.renderingOptions.LogarithmicDepthBuffer =
      //     true;

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
        .then((lightModels) => {
          //   console.log("lightModels", lightModels);
        });

      viewer2
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
      this.viewer = viewer;
      this.viewer2 = viewer2;
    });
  }

  // beforeDestroy() {
  //   this.viewer.process.dispose();
  //   this.viewer2.process.dispose();
  // }
}
</script>

<style scoped lang="scss">
.demo-wrapper {
  display: flex;
  flex: 1;
}
</style>
