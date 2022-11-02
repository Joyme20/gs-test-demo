<template>
  <div id="app">
    <div class="viewer-wrapper">
      <viewerWrapper elementId="viewer" style="flex: 1" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import BimAir, { Viewer } from "gs-bim-air";

Vue.use(BimAir.ViewerWrapper);

export default {
  name: "App",
  components: {},
  methods: {
    getPoint() {
      let camera = viewer.animationManager.pathRoam.getRoamPoint();
      console.log("camera", camera);
    },

    startPathRoam() {
      // 播放动画
      let points = [
        [380416.0671187355, 38786.28087566431, 4155.782292435952],
        [380730.74617450393, 38801.12997364584, 4404.750407980944],
      ];
      let targets = [
        [379975.34973484656, 39356.55973798728, 2473.4870208851316],
        [380290.028790615, 39371.4088359688, 2722.455136430124],
      ];
      // 创建动画
      let animationId = viewer.animationManager.pathRoam.addRoamPathAnime(
        10,
        points,
        targets
      );
      viewer.animationManager.pathRoam.run([animationId]);
      return animationId;
    },

    pausePathRoam() {
      let animationId = this.startPathRoam();
      viewer.animationManager.pathRoam.stopAnime(animationId);
    },

    PathRoam0() {
      let animationId = this.startPathRoam();
      viewer.animationManager.pathRoam.run([animationId]);
    },
  },

  data: () => {
    return {
      isShow: true,
      viewer: null,
    };
  },

  mounted() {
    let options = {
      elementId: "viewer",
      modelService: "https://static.graphicstone.com/modelApi",
      fileService: "https://static.graphicstone.com/fileApi",
    };

    BimAir.Loader({ isShareArrayBuffer: true }).then(() => {
      let viewer = new BimAir.Viewer(options);

      viewer
        .loadModels(
          [
            "634e8975317218508c189d62",
            "634e8999317218508c189df0",
            "634e89bc317218508c189e4f",
            "634e898e317218508c189de0",
            "634e89cc317218508c189e62",
            "634e89e1317218508c189e6d",
            "634e89fc317218508c189e75",
          ],
          true
        )
        .then((lightModels) => {
          console.log(lightModels);
          // viewer.instanceObjectSegment.renderingOptions.LogarithmicDepthBuffer = true;
          viewer.fitWorld();

          // let isolationMaterial = new BimAir.Material(viewer, "isolation");

          viewer.isolationManager.material.setColor(255, 0, 0);

          let material2 = new BimAir.Material(viewer, "test2");
          material2.setColor(127, 250, 0, 1);
          lightModels[1].setAllComponentsIsolation(true);
          viewer.updateDisplay();
        });
      this.viewer = viewer;
    });
  },

  beforeDestroy() {
    this.viewer.process.dispose();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  height: 100vh;
  /* overflow: hidden; */
}

.viewer-wrapper {
  width: 100%;
  height: 100%;
  /* position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0; */
  display: flex;
}
</style>
