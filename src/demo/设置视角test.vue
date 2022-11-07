<template>
  <div id="app">
    <!-- <div class="button-group"> -->
    <!-- <input type="number" min="0" max="100" id="inputNum" placeholder="输入透明度，为大于0小于100的数"> -->
    <!-- <button type="button" @click="animationBegin(lightModels)">开始动画</button> -->
    <!-- <button type="button" @click="startPathRoam()">开始路径漫游</button>
      <button type="button" @click="pausePathRoam()">暂停路径漫游</button>
      <button type="button" @click="PathRoam0()">路径漫游</button> -->
    <!-- </div> -->
    <!-- <viewer-wrapper elementId="viewer" style="height: 100%; width: 100%" /> -->
    <div class="viewer-wrapper">
      <viewerWrapper elementId="viewer" style="flex: 1" />
      <!-- <viewerWrapper elementId="viewer2" style="flex: 1" v-if="isShow" /> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
// import BimAir from "../public/js/ViewerWrapper.umd.js";
// import "../public/js/ViewerWrapper.css";

import BimAir from "gs-bim-air";
// import "gs-bim-air/lib/BimAir.css";;
// eslint-disable-next-line
Vue.use(BimAir.ViewerWrapper);

export default {
  name: "App",
  components: {},
  methods: {
    // getPoint() {
    //   let camera = viewer.animationManager.pathRoam.getRoamPoint();
    //   console.log("camera", camera);
    // },
    // startPathRoam() {
    //   // 播放动画
    //   let points = [
    //     [380416.0671187355, 38786.28087566431, 4155.782292435952],
    //     [380730.74617450393, 38801.12997364584, 4404.750407980944]
    //   ];
    //   let targets = [
    //     [379975.34973484656, 39356.55973798728, 2473.4870208851316],
    //     [380290.028790615, 39371.4088359688, 2722.455136430124]
    //   ];
    //   // 创建动画
    //   let animationId = viewer.animationManager.pathRoam.addRoamPathAnime(10, points, targets);
    //   viewer.animationManager.pathRoam.run([animationId]);
    //   return animationId;
    // },
    // pausePathRoam() {
    //   let animationId = this.startPathRoam();
    //   viewer.animationManager.pathRoam.stopAnime(animationId);
    // },
    // PathRoam0() {
    //   let animationId = this.startPathRoam();
    //   viewer.animationManager.pathRoam.run([animationId]);
    // },
  },

  data: () => {
    return {
      isShow: true,
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
    // let options2 = {
    //   elementId: "viewer2",
    //   modelService: "https://static.graphicstone.com/modelApi",
    //   fileService: "https://static.graphicstone.com/fileApi",
    // };
    let animationId = [];
    let tempId;
    let id = "632273cbbc278049a0898a0e";
    let model1 = "632273cfbc278049a0898a12";
    let aboutCamera = {
      position: new Float64Array([
        379616.5107640662, 39010.14112519471, 3100.249584678414,
      ]),
      target: new Float64Array([380036.613, 39459.857, 3066.088]),
      up: new Float64Array([0.084, 0.079, 0.993]),
      field: 554.132,
    };
    let roamTime = 2;
    let time;

    BimAir.Loader({ isShareArrayBuffer: true }).then(() => {
      let viewer = new BimAir.Viewer(options);
      // let viewer2 = new BimAir.Viewer(options2);
      console.log("1");
      viewer
        .loadModels(
          [
            id,
            // model1,
          ],
          true
        )
        .then((lightModels) => {
          // med models
          // viewer.loadModels(["634e903d317218508c18a016"], true).then((projects) => {
          // "634e8975317218508c189d62"
          // "634e8999317218508c189df0"
          // "634e89bc317218508c189e4f"
          // "634e898e317218508c189de0"
          // "634e89cc317218508c189e62"
          // "634e89e1317218508c189e6d"
          // "634e89fc317218508c189e75"
          // viewer.instanceObjectSegment.renderingOptions.LogarithmicDepthBuffer = true;
          setTimeout(() => {
            viewer.camera.position = aboutCamera.position;
            viewer.camera.target = aboutCamera.target;
            viewer.camera.up = aboutCamera.up;
            viewer.camera.setField(554.132, 554.132);
            viewer.updateDisplay();
          }, 0);
          // viewer.camera.position = aboutCamera.position;
          // viewer.camera.target = aboutCamera.target;
          // viewer.camera.up = aboutCamera.up;
          // viewer.camera.setField(554.132, 554.132);
          // viewer.updateDisplay();
          // return
        });
    });
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
