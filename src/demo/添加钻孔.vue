<template>
  <div class="demo-wrapper">
    <viewer-wrapper elementId="viewer" style="flex: 1" />
    <div class="toolbar">
      <button @click="addHoleClick(viewer)">添加钻孔</button>
    </div>
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
  };

  viewer: Viewer;

  addHoleClick(viewer: Viewer) {
    // this.axios.get("test/钻孔.json").then((data: any) => {
    let data = [
      {
        id: "zk_58_117",
        code: "ZK08",
        holeDepth: 211,
        X: 159.292,
        Y: 69.648,
        Z: 3022.696,
        AZ: 315,
        AN: -45,
        thickness: 2.3,
        startCalibrer: 3,
        endCalibrer: 1.5,
      },
    ];
    viewer.addBoreholes("钻孔组模型", data, [255, 0, 0, 0.5]);
  }

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
      this.viewer = viewer;
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
