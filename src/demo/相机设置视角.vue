<template>
  <div class="demo-wrapper">
    <viewer-wrapper elementId="viewer" style="flex: 1" />
    <div class="toolbar"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BimAir, { Options, Viewer } from "gs-bim-air";
import config from "../config";

Vue.use(BimAir.ViewerWrapper);

@Component({
  components: {},
})
export default class Index extends Vue {
  options: Options = {
    elementId: "viewer",
    background: "linear-gradient(#e3fcfc, #f6ffff)",
    isShowLoading: true,
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

      viewer
        .loadModels(
          [
            {
              // id: this.$route.query.modelId as string,
              // version: Number(this.$route.query.version),
              id: "63637cd7d03b9c745d40e60d",
              version: 0,
            },
          ],
          true,
          true
        )
        .then((lightModels) => {
          let camera = {
            position: new Float64Array([
              380011.0072859285, 39329.16853932577, 3086.94970861438,
            ]),
            target: new Float64Array([
              380035.18753539637, 39358.878949742066, 3047.2609726861047,
            ]),
            up: new Float64Array([
              0.45418543656361043, 0.5580602373326292, 0.6944669615768428,
            ]),
            width: 55.159665617399554,
            height: 55.159665617399554,
          };

          // 单独设置camera属性
          this.viewer.camera.position = camera.position;
          this.viewer.camera.target = camera.target;
          this.viewer.camera.up = camera.up;
          this.viewer.camera.setField(camera.width, camera.height);
          this.viewer.updateDisplay();

          // 或者直接整个camera替换
          // viewer.camera = camera;
        });
    });
  }

  beforeDestroy() {
    this.viewer.process.dispose();
  }
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
