<template>
  <div class="demo-wrapper">
    <viewer-wrapper elementId="viewer" style="flex: 1" />
    <div class="toolbar"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BimAir, { Options, Viewer } from "gs-bim-air";

// import BimAir, {
//   Options,
//   Viewer,
// } from "../../../../../vue-ts-bimlight-platform/packages/bimAir/lib/BimAir.umd";
// import "../../../../../vue-ts-bimlight-platform/packages/bimAir/lib/BimAir.css";

Vue.use(BimAir.ViewerWrapper);

@Component({
  components: {},
})
export default class Index extends Vue {
  options: Options = {
    elementId: "viewer",
    background: "linear-gradient(#e3fcfc, #f6ffff)",
    isShowLoading: true,
    modelService: "https://static.graphicstone.com/modelApi",
    fileService: "https://static.graphicstone.com/fileApi",
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
      // console.log(
      //   "this.viewer.isShareArrayBuffer",
      //   this.viewer.isShareArrayBuffer
      // );
      // viewer.isSharedArrayBuffer = true;

      viewer
        .loadModels(
          [
            {
              // id: ,
              // version: 1,
              id: "6316b4783247112e1055f466",
              version: 1,
            },
          ],
          true
          // true
        )
        .then((lightModels) => {});
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
