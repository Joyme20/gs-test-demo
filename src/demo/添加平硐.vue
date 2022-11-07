<template>
  <div class="demo-wrapper">
    <viewer-wrapper elementId="viewer" style="flex: 1" />
    <div class="toolbar">
      <button @click="addAditClick(viewer)">添加平硐</button>
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
    background: "linear-gradient(#e3fcfc, #f6ffff)",
    isShowLoading: true,
  };

  viewer: Viewer;

  addAditClick(viewer: Viewer) {
    // this.axios.get("test/平硐.json").then((data: any) => {
    let data = [
      {
        id: "3",
        code: "PD101", //平硐编号
        calibrer: 0.002, //保留口径
        calibrerType: "1", //口径类型，1拱洞型
        controlPoints: [
          {
            orderNo: 0,
            X: 603.264611, //坐标(X)
            Y: 3371.071132, //坐标(Y)
            Z: 3.134849, //坐标(Z)
          },
          {
            orderNo: 1,
            direction: 256.0, //洞向
            dip_angle: 0.59, //坡度
            no: 0.013, //桩号（表示里程，需减去上一里程量）
          },
          {
            orderNo: 2,
            direction: 266.0, //洞向
            dip_angle: 0.59, //坡度
            no: 0.025, //桩号（表示里程，需减去上一里程量）
          },
          {
            orderNo: 3,
            direction: 261.0, //洞向
            dip_angle: 0.59, //坡度
            no: 0.152, //桩号（表示里程，需减去上一里程量）
          },
        ],
      },
    ];
    viewer.addAdits("平硐组模型", data, [0, 0, 255, 0.5]);
    // });
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
              id: "63355161317218508c163264",
              version: 1,
            },
          ],
          true,
          true
        )
        .then((lightModels) => {});
      this.viewer = viewer;
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
