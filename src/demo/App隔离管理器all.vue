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

  },
  data: () => {
    return {
      isShow: true,
    };
  },

  mounted() {
    let options = {
      elementId: "viewer",
      modelService: "http://8.134.85.254:9036/api",
      fileService: "http://8.134.85.254:9040/api",
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
    //   modelService: "http://8.134.85.254:9036/api",
    //   fileService: "http://8.134.85.254:9040/api",
    // };

    BimAir.Loader({ isShareArrayBuffer: true }).then(() => {
      let viewer = new BimAir.Viewer(options);
      // let viewer2 = new BimAir.Viewer(options2);
      let id = "62ba4f263a591513fe17d896";
      let model1 = "62ba4f503a591513fe17d930"; // 4肘管模型Id
      let model2 = "62ba4f473a591513fe17d919";   //  4锥管模型Id
      let model3 = "62ba4f5b3a591513fe17d93d";   // 4蜗壳
      let model4 = "62ba4f393a591513fe17d8fe";   // 4座环
      let model5 = "62ba4f5f3a591513fe17d941";   // 4机坑里衬
      let m6 = "62c2858503225b3400faa7cc";  // 3座环
      let m7 = "62c2857e03225b3400faa7a9";  // 3肘管
      let m8 = "62c2857b03225b3400faa798";  // 3#蜗壳FA
      let m9 = "62c2856203225b3400faa74e";  // 2座环
      let aboutCamera = {
        position: [380545.319, 39418.008, 3073.72],
        target: [379991.188, 39417.578, 3073.291],
        up: [-0.001, -0.285, 0.959],
        field: 554.132,
      };

          // position： 380545.319, 39418.008, 3073.72
          // target： 379991.188, 39417.578, 3073.291
          // up： -0.001, -0.285, 0.959
          // width： 554.132
          // height： 554.132


      viewer.loadModels([id, model1], true).then((lightModels) => {
        viewer.camera.position = aboutCamera.position;
        viewer.camera.target = aboutCamera.target;
        viewer.camera.up = aboutCamera.up;
        viewer.camera.setField(aboutCamera.field, aboutCamera.field);
        //viewer.updateDisplay();
        // console.log(viewer);
        // console.log(lightModels[1]);

        let objectID1 = "QMD+M+4G+HYD+XDRA01+EL002";
        let object1 = lightModels[1].segmentObject;
        viewer.isolationManager.material.setColor(127, 250, 0, 0.5);
        let childNodes1 = object1.treeNodeOject.childNodes;
        // console.log(childNodes1,"11111111111111111", childNodes1.length);
        let object_temp = viewer.structureTreeManager.getTreeNodesByName('MED-C-01-CF-ZCF-002-005(5#机组)');
        let object_temp2 = viewer.structureTreeManager.getTreeNodesByName('3D形状00244356 A.1');
         console.log(object_temp);
         // console.log(object_temp.items[0]);
        
        // let style = viewer.isolationManager.isolationStyleSegment;
        // console.log(style);


        // viewer.isolationManager.isolation([childNodes1[0].childNodes[8]]);
        // viewer.isolationManager.isolation([object_temp.items[0], childNodes1[0].childNodes[8]]);
        viewer.isolationManager.isolation([object1,lightModels[0].segmentObject]);
        viewer.updateDisplay();
        // lightModels[1].setComponentsIsolation([objectID1], true);
        let t = viewer.isolationManager.isIsolation(childNodes1[0].childNodes[8]);
        console.log(t);
        console.log("1");
        // viewer.isolationManager.isolationInvert([object_temp.items[0], childNodes1[0].childNodes[8]]);

        // viewer.isolationManager.clearIsolation([object1]);

        setTimeout(() => {
          viewer.isolationManager.clearIsolation([object1]);
          //viewer.isolationManager.clearAllIsolation();
          viewer.updateDisplay();
          console.log('4s');
        }, 4000);


        // console.log(viewer.isolationManager.isolationDatas);

        

      });
      // viewer.modelDebug = true;


      // setTimeout(() => {
      //   viewer2.dispose();
      //   this.isShow = false;
      //   setTimeout(() => {
      //     viewer.updateSize();
      //   }, 0);
      // }, 5000);

      // let defaultFont =
      //   "getComputedSylte" in window
      //     ? getComputedStyle(document.documentElement)["font-family"]
      //     : document.documentElement.currentStyle["font-family"];

      // // let f = new FontFace("Avenir");
      // console.log("ffffffffffff", defaultFont);

      // let fontkit = require("fontkit");

      // // open a font synchronously
      // let font = fontkit.openSync("./font/精简版微软雅黑TTF.ttf");

      // // layout a string, using default shaping features.
      // // returns a GlyphRun, describing glyphs and positions.
      // let run = font.layout("hello world!");

      // // get an SVG path for a glyph
      // let svg = run.glyphs[0].path;
      // console.log("svg-----------", svg);
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
