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
import "gs-bim-air/lib/BimAir.css";
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
      p0[2] = center[2] + 300;

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

    let animationId;

    BimAir.Loader({ isShareArrayBuffer: true }).then(() => {
      let viewer = new BimAir.Viewer(options);
      // let viewer2 = new BimAir.Viewer(options2);

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
          viewer.panelManager.viewPointPanel.restoreViewPointById(
            "1b9eaecc-e65c-4af6-a09c-6471f6a122fc"
          );

          let material2 = new BimAir.Material(viewer, "test2");
          material2.setColor(127, 250, 0, 0.6);

          let id = "63-01+10-30.10.10.10+12-30.20.00.00+53-10.26.00";
          viewer.isolationManager.material.setColor(120, 250, 0, 0.5);
          lightModels[1].setAllComponentsVisible(false);
          viewer.updateDisplay();

          let roamTime = 4;
          let animationId1 = this.getAnimation(
            viewer,
            lightModels[3],
            id,
            roamTime
          );

          setTimeout((start1) => {
            lightModels[3].setAllComponentsIsolation(true);
            // lightModels[3].setComponentsColor([id], material2);
            lightModels[3].setComponentsIsolation([id], false, false);
            viewer.process.animationManager.run([animationId1]);
            viewer.updateDisplay();
            console.log("6s");
          }, 6000);

          setTimeout((start2) => {
            lightModels[3].setAllComponentsIsolation(false);
            lightModels[1].setAllComponentsVisible(true);
            viewer.updateDisplay();
            console.log("finish");
          }, 10000);
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
