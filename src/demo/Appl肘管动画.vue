<template>
  <div id="app">
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
// // import "gs-bim-air/lib/BimAir.css";;
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

    getAnimation(viewer, model, objectID, roamTime) {
      let moveSegmentObject = model.getComponent(objectID);
      let bb = viewer.computeViewBoundingBox(moveSegmentObject.segment);
      let center = new Float64Array([
        (bb[0] + bb[3]) / 2,
        (bb[1] + bb[4]) / 2,
        (bb[2] + bb[5]) / 2,
      ]);
      let p0 = new BimAir.Longan.Point();
      p0[0] = center[0];
      p0[1] = center[1];
      p0[2] = center[2] + 100;

      let p1 = new BimAir.Longan.Point();
      p1[0] = center[0];
      p1[1] = center[1];
      p1[2] = center[2];
      let points = new Array();
      points.push(p0);
      points.push(p1);

      // viewer.process.animationManager.drawStraight(viewer, points);
      let animationId = viewer.process.animationManager.objectRoamWithoutRotate(
        viewer,
        moveSegmentObject,
        points,
        roamTime,
        0,
        () => {
          console.log(viewer, objectID);
        }
      );
      return animationId;
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
      //viewerType: "project",
      // toolbarVisible: {
      //   rightToolbar: false,
      // },
      modelService: "https://static.graphicstone.com/modelApi",
      fileService: "https://static.graphicstone.com/fileApi",
    };

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
      this.viewer = viewer;
      // let viewer2 = new BimAir.Viewer(options2);

      viewer.loadModels([id, model1], true).then((lightModels) => {
        viewer.camera.position = aboutCamera.position;
        viewer.camera.target = aboutCamera.target;
        viewer.camera.up = aboutCamera.up;
        viewer.camera.setField(aboutCamera.field, aboutCamera.field);
        viewer.updateDisplay();
        // return

        let material2 = new BimAir.Material(viewer, "test2");
        material2.setColor(127, 250, 0, 0.3);
        let objectID = [
          "QMD+M+4G+HYD+XDRA01+EL015",
          "QMD+M+4G+HYD+XDRA01+EL014",
          "QMD+M+4G+HYD+XDRA01+EL013",
          "QMD+M+4G+HYD+XDRA01+EL012",
          "QMD+M+4G+HYD+XDRA01+EL011",
          "QMD+M+4G+HYD+XDRA01+EL010",
          "QMD+M+4G+HYD+XDRA01+EL009",
          "QMD+M+4G+HYD+XDRA01+EL008",
          "QMD+M+4G+HYD+XDRA01+EL007",
          "QMD+M+4G+HYD+XDRA01+EL006",
          "QMD+M+4G+HYD+XDRA01+EL005",
          "QMD+M+4G+HYD+XDRA01+EL004",
          "QMD+M+4G+HYD+XDRA01+EL003",
          "QMD+M+4G+HYD+XDRA01+EL002",
          "QMD+M+4G+HYD+XDRA01+EL001",
        ];

        for (let i = 0; i < 15; i++) {
          // console.log(objectID[i]);
          animationId[i] = this.getAnimation(
            viewer,
            lightModels[1],
            objectID[i],
            roamTime
          );
        }
        for (let i = 0; i < 15; i++) {
          setTimeout(() => {
            lightModels[1].setComponentsVisible([objectID[i]], true);
            viewer.process.animationManager.run([animationId[i]]);
          }, 4000 + i * 2000);
        }

        viewer.isolationManager.material.setColor(127, 250, 0, 0.2);
        lightModels[0].setAllComponentsIsolation(true);
        lightModels[1].setAllComponentsVisible(false);

        // let animationId1 = this.getAnimation(viewer, lightModels[1], id, roamTime);
      });
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
