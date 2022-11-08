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
    isShowLoading: false,
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

      viewer
        .loadModels(
          [
            {
              // id: ,
              // version: 1,
              id: "63355161317218508c163264",
              version: 3,
            },
          ],
          true,
          true
        )
        .then((lightModels) => {
          let seg = viewer.utilitySegment.subsegment("text");
          seg.insertVectorText(
            "文字测试Abc123",
            [5, 5, 5],
            [1, 0, 0],
            [0, 1, 0],
            16
          );
          seg.renderingOptions.cullBackFace = false; //双面绘制

          viewer.updateDisplay();
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
