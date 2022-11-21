<template>
  <div class="demo-wrapper">
    <viewer-wrapper elementId="viewer" style="flex: 1" />
    <div class="toolbar"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BimAir, { Options, Viewer } from "gs-bim-air";

Vue.use(BimAir.ViewerWrapper);

@Component({
  components: {},
})
export default class Index extends Vue {
  options: Options = {
    elementId: "viewer",
    background: "linear-gradient(#e3fcfc, #f6ffff)",
    isShowLoading: true,
    // modelService: "https://static.graphicstone.com/modelApi",
    // fileService: "https://static.graphicstone.com/fileApi",

    modelService: "https://8.134.85.254:9031/api",
    fileService: "https://8.134.85.254:9041/api",
  };

  viewer: Viewer;

  mounted() {
    BimAir.Loader({
      isShareArrayBuffer: false,
    }).then(() => {
      let viewer = new BimAir.Viewer(this.options);
      viewer.instanceObjectSegment.renderingOptions.LogarithmicDepthBuffer =
        true;
      this.viewer = viewer;

      // viewer
      //   .loadModels(
      //     [
      //       {
      //         // id: ,
      //         // version: 1,
      //         id: this.$route.query.modelId as string,
      //         version: Number(this.$route.query.version),
      //       },
      //     ],
      //     true,
      //     true
      //   )
      //   .then((lightModels) => {});
      viewer.loadRenderObjects(["6ddabd40-4492-42f0-a16e-b9c0f9bb98b9"]);
    });
  }

  // beforeDestroy() {
  //   this.viewer.process.dispose();
  // }
}
</script>

<style scoped lang="scss">
.demo-wrapper {
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
}
.toolbar {
  position: absolute;
  left: 80px;
  top: 20px;
}
</style>
