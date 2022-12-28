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
    // background: "linear-gradient(#e3fcfc, #f6ffff)",
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

      let mca = {
        image: "../../images/light_model.svg",
        expanded: false,
        childObjects: [],
        visible: true,
        modelFile: "大坝模型.gsz",
        modelId: "63631d74043ea525dc79bb30",
        name: "大坝模型",
        typeName: "LightModel",
        id: "58fe9c88-7364-46a5-b51a-79b244199e60",
        version: 1,
        properties: {
          boundingBox: [
            379807.4, 38868.3, 3073.0002, 380567.78, 39305.484, 3333.6685,
          ],
        },
      };
      viewer.loadModelByMCA(mca, true);
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
