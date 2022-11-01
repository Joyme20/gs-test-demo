<template>
  <div id="app">
    <!-- <div class="button-group">
      <input type="number" min="0" max="100" id="inputNum" placeholder="输入透明度，为大于0小于100的数">
      <button type="button" @click="getPoint()">获取点</button>
      <button type="button" @click="startPathRoam()">开始路径漫游</button>
      <button type="button" @click="pausePathRoam()">暂停路径漫游</button>
      <button type="button" @click="PathRoam0()">路径漫游</button>
    </div> -->
    <!-- <viewer-wrapper elementId="viewer" style="height: 100%; width: 100%" /> -->
    <div class="viewer-wrapper">
      <viewerWrapper elementId="viewer" style="flex: 1" />
      <viewerWrapper elementId="viewer2" style="flex: 1" v-if="isShow" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
// import BimAir from "../public/js/ViewerWrapper.umd.js";
// import "../public/js/ViewerWrapper.css";

// import BimAir from "gs-bim-air";
// import "gs-bim-air/lib/BimAir.css";
// import { ftruncate } from "fs";
// eslint-disable-next-line
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
      viewer
    };
  },

  mounted() {
    let options = {
      elementId: "viewer",
      //viewerType: "project",
      // toolbarVisible: {
      //   rightToolbar: false,
      // },
      modelService: "https://static.graphicstone.com/modelApi",
      fileService: "https://static.graphicstone.com/fileApi",
      // modelService: "http://8.134.85.254:9031/api",
      // fileService: "http://8.134.85.254:9040/api",
      // components: {
      //   property: {
      //     tabs: [
      //       {
      //         name: "11111",
      //         component: () => import("./components/HelloWorld.vue"),
      //       },
      //     ],
      //   },
      // },
    };
    let options2 = {
      elementId: "viewer2",
      modelService: "https://static.graphicstone.com/modelApi",
      fileService: "https://static.graphicstone.com/fileApi",
    };
    let animationId;

    BimAir.Loader({ isShareArrayBuffer: true }).then(() => {
      let viewer = new BimAir.Viewer(options);
      let viewer2 = new BimAir.Viewer(options2);

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
          // viewer.loadModels(["634e903d317218508c18a016"], true).then((projects) => {
          viewer.instanceObjectSegment.renderingOptions.LogarithmicDepthBuffer = true;
          viewer.fitWorld();
          // viewer.panelManager.viewPointPanel.restoreViewPointById("1b9eaecc-e65c-4af6-a09c-6471f6a122fc");

          // viewer.isolationManager.material.setColor(120, 250, 0, 0, 5);
          let material2 = new BimAir.Material(viewer, "test2");
          material2.setColor(127, 250, 0, 1);
          //  // lightModels[1].setAllComponentsColor(material2);
          lightModels[1].setAllComponentsIsolation(true);
          // id = "63-01+10-30.10.10.10+12-30.20.00.00+53-10.26.00";
          // let t = viewer.getComponents(id);
          // console.log(t);
          // viewer.setComponentsColor([id]);
          viewer.updateDisplay();
        });
        this.viewer = viewer

      viewer2
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
        .then((lightModels2) => {
          // viewer.loadModels(["634e903d317218508c18a016"], true).then((projects) => {
          viewer2.instanceObjectSegment.renderingOptions.LogarithmicDepthBuffer = true;
          viewer2.fitWorld();
          viewer2.isolationManager.material.setColor(120, 250, 0, 0, 5);
          lightModels2[1].setAllComponentsIsolation(true);
          viewer2.updateDisplay();
        });
    });
  },

  beforeDestory() {
    this.viewer.dispose();
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
