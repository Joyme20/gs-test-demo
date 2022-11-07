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



      viewer.loadModels([id, model1], true).then((lightModels) => {
        // //////////////////// about scene  ////////////////////
        viewer.camera.position = new Float64Array([379633.85, 39084.71, 3129.943]);
        viewer.camera.target = new Float64Array([380036.613, 39459.857, 3066.088]);
        viewer.camera.up = new Float64Array([0.084, 0.079, 0.993]);
        viewer.camera.setField(554.132, 554.132);
        viewer.updateDisplay();


        lightModels[0].setAllComponentsVisible(false);
        // lightModels[1].setAllComponentsVisible(false);
        let moveObjId1 = "QMD+M+4G+HYD+XDRA01+EL002";
        let moveObjId2 = "QMD+M+4G+HYD+XDRA01+EL004";

        let material1 = new BimAir.Material(viewer, "test");
        material1.setColor(127, 250, 0, 1);

        let material2 = new BimAir.Material(viewer, "test2");
        material2.setColor(127, 0, 0, 1);

        let objcet1 = lightModels[1].segmentObject;
        objcet1.setMaterial(material1);

        lightModels[1].setComponentsColor([moveObjId1, moveObjId2], material2);
        // lightModels[1].setComponentsColor([moveObjId2], null);
        objcet1.setMaterial(null);
        lightModels[1].setComponentsColor([moveObjId2], null);





      });
      // viewer.modelDebug = true;

      viewer2.loadModels([id, model1, m9, m8], true).then((lightModels2) => {
        viewer2.fitWorld();

      });

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
