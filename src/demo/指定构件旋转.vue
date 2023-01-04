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
  options = {
    // viewerType: "model",
    elementId: "viewer",

    modelService: "https://static.graphicstone.com/modelApi",
    fileService: "https://static.graphicstone.com/fileApi",
    // background: "linear-gradient(#e3fcfc, #f6ffff)";
  };

  viewer: Viewer;

  mounted() {
    BimAir.Loader({
      isShareArrayBuffer: false,

      text: {
        isLoad: true,
      },
    }).then(() => {
      let viewer = new BimAir.Viewer(this.options);
      // viewer.instanceObjectSegment.renderingOptions.LogarithmicDepthBuffer =
      //   true;
      this.viewer = viewer;

      let modelId = "6391a6e3cc5b00101d8ee686";
      let componentId = "954779";

      viewer.loadModels(modelId).then((lightModels) => {
        //
        let component = viewer.getComponent(modelId, componentId);
        // let bb1 = viewer.computeViewBoundingBox(component.segment);
        // console.log("bb1:", bb1);
        let bb = viewer.computeBoundingBox(component.segment);
        console.log("bb:", bb);
        let center = [
          (bb[0] + bb[3]) / 2,
          (bb[1] + bb[4]) / 2,
          (bb[2] + bb[5]) / 2,
        ];
        // 旋转一圈的耗时(s)
        let speedOfTime = 10;
        let id = viewer.animationManager.segmentRotateLoop(
          viewer,
          component,
          new Float64Array(center),
          new Float64Array([0, 0, 1]),
          speedOfTime
        );

        viewer.animationManager.run([id]);
        viewer.locateObject(component);
      });
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
