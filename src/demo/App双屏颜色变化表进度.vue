<template>
  <div id="app">
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
    let options2 = {
      elementId: "viewer2",
      modelService: "http://8.134.85.254:9036/api",
      fileService: "http://8.134.85.254:9040/api",
    };

    BimAir.Loader({ isShareArrayBuffer: true }).then(() => {
      let viewer = new BimAir.Viewer(options);
      let viewer2 = new BimAir.Viewer(options2);
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
      let house = "62cbcfe7525bed6af87e20b6";


      viewer.loadModels([id, model1], true).then((lightModels) => {
        //////////////////// about scene  ////////////////////
        setTimeout((scene) => {
          viewer.camera.position = new Float64Array([379633.85, 39084.71, 3129.943]);
          viewer.camera.target = new Float64Array([380036.613, 39459.857, 3066.088]);
          viewer.camera.up = new Float64Array([0.084, 0.079, 0.993]);
          viewer.camera.setField(554.132, 554.132);
          viewer.fitWorld();
        }, 150);

        lightModels[0].setAllComponentsIsolation(true);
        lightModels[1].setAllComponentsVisible(false);
        // let moveObjId1 = "QMD+M+4G+HYD+XDRA01+EL002";
        // let moveObjId2 = "QMD+M+4G+HYD+XDRA01+EL003";


        let material = new BimAir.Material(viewer, 'test');
        material.setColor(127, 250, 0, 1);
        lightModels[1].setAllComponentsColor(material);

        let cuttingOptions1 = new BimAir.CuttingOptions();
        cuttingOptions1.type = BimAir.CuttingCreateType.BoundingBoxZ;
        cuttingOptions1.ratio = 0;
        //cuttingOptions1.color = [125, 250, 0, 0.6];

        viewer.updateDisplay();
        console.log("update1");

        setTimeout((status2) => {
          cuttingOptions1.ratio = 0.25;
          lightModels[1].segmentObject.setCutting(cuttingOptions1);
          lightModels[1].setAllComponentsVisible(true);
          viewer.updateDisplay();
          console.log("update2");
        }, 4000);

        setTimeout((status3) => {
          cuttingOptions1.ratio = 0.5;
          lightModels[1].segmentObject.setCutting(cuttingOptions1);
          viewer.updateDisplay();
          console.log("update3");
        }, 5500);

        setTimeout((status4) => {
          cuttingOptions1.ratio = 0.75;
          lightModels[1].segmentObject.setCutting(cuttingOptions1);
          viewer.updateDisplay();
          console.log("update4");
        }, 7000);

        setTimeout((status5) => {
          cuttingOptions1.ratio = 1;
          lightModels[1].segmentObject.setCutting(cuttingOptions1);
          viewer.updateDisplay();
          console.log("update5");
        }, 8500);

        setTimeout((finish6) => {
          lightModels[1].setAllComponentsColor(null);
          viewer.updateDisplay();
          console.log("finish");
        }, 9000);

      });
      // viewer.modelDebug = true;

      viewer2.loadModels([id, model1, m9, m8], true).then((lightModels2) => {
        //////////////////// about scene  ////////////////////
        setTimeout((scene) => {
          viewer2.camera.position = new Float64Array([37993.926, 38889.343, 3240.845]);
          viewer2.camera.target = new Float64Array([37991.186, 39417.579, 3073.291]);
          viewer2.camera.up = new Float64Array([-0.002, 0.302, 0.953]);
          viewer2.camera.setField(554.132, 554.132);
          viewer2.fitWorld();
        }, 850);

        lightModels2[0].setAllComponentsIsolation(true);
        lightModels2[1].setAllComponentsVisible(false);
        // let moveObjId1 = "QMD+M+4G+HYD+XDRA01+EL002";
        // let moveObjId2 = "QMD+M+4G+HYD+XDRA01+EL003";


        let material2 = new BimAir.Material(viewer2, 'test2');
        material2.setColor(127, 0, 0, 1);
        lightModels2[1].setAllComponentsColor(material2);

        let cuttingOptions2 = new BimAir.CuttingOptions();
        cuttingOptions2.type = BimAir.CuttingCreateType.BoundingBoxZ;
        cuttingOptions2.ratio = 0;
        //cuttingOptions1.color = [125, 250, 0, 0.6];

        viewer2.updateDisplay();
        console.log("update1!");

        setTimeout((status20) => {
          cuttingOptions2.ratio = 0.25;
          lightModels2[1].segmentObject.setCutting(cuttingOptions2);
          lightModels2[1].setAllComponentsVisible(true);
          viewer2.updateDisplay();
          console.log("update2!");
        }, 4000);

        setTimeout((status30) => {
          cuttingOptions2.ratio = 0.5;
          lightModels2[1].segmentObject.setCutting(cuttingOptions2);
          viewer2.updateDisplay();
          console.log("update3!");
        }, 6000);

        setTimeout((status40) => {
          cuttingOptions2.ratio = 0.75;
          lightModels2[1].segmentObject.setCutting(cuttingOptions2);
          viewer2.updateDisplay();
          console.log("update4!");
        }, 8000);

        setTimeout((status5) => {
          cuttingOptions2.ratio = 1;
          lightModels2[1].segmentObject.setCutting(cuttingOptions2);
          viewer2.updateDisplay();
          console.log("update5!");
        }, 10000);

        setTimeout((finish6) => {
          lightModels2[1].setAllComponentsColor(null);
          viewer2.updateDisplay();
          console.log("finish!");
        }, 10500);

      });

      // setTimeout(() => {
      //   viewer2.dispose();
      //   this.isShow = false;
      //   setTimeout(() => {
      //     viewer.updateSize();
      //   }, 0);
      // }, 12000);

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

      // get an SVG path for a glyph
      let svg = run.glyphs[0].path;
      console.log("svg-----------", svg);
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
