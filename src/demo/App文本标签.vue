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
// import "gs-bim-air/lib/BimAir.css";;
// eslint-disable-next-line
Vue.use(BimAir.ViewerWrapper);

export default {
  name: "App",
  components: {},
  methods: {},
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
      // let viewer2 = new BimAir.Viewer(options2);
      ////////////////////////  med  ////////////////////////
      let model1 = "63086634b15c844749906303";
      let model2 = "6308666eb15c844749906365";
      let model3 = "63086a4cb15c844749906525";
      let model4 = "630867a1b15c844749906446";

      let id = "630efcbeb15c84474990ef0e";

      // let id = "62ba4f263a591513fe17d896";
      // let model1 = "62ba4f503a591513fe17d930";   // 4肘管模型Id
      // let model2 = "62ba4f473a591513fe17d919";

      ////////////////////////  DSX  ////////////////////////
      // let model1 = "6308736eb15c8447499068c4";  // 地质体
      // let model2 = "630873b7b15c844749906a8b";  // 地形面
      // let model3 = "630873c4b15c844749906ad9";  // 总开挖
      // let model4 = "630873d2b15c844749906ae6";  // 厂房开挖面
      // let model5 = "630873dbb15c844749906aee";  // 面板坝-枢纽区

      viewer.loadModels([model2, model3, model4], true).then((lightModels) => {
        ////////////////////  med  ////////////////////
        // viewer.camera.position = [379180.67723595933, 36125.55484209484, 4985.083124223216];
        // viewer.camera.target = [380089.2183179572, 39656.31598103467, 2423.466351732091];
        // viewer.camera.up = [0.14326775882806483, 0.556765394885421, 0.8182216352177841];
        // viewer.camera.setField(2227.869027065647, 2227.869027065647);
        // viewer.updateDisplay();
        viewer.fitWorld();

        /////////////////////////////  about scene  /////////////////////////////
        // viewer.camera.position = new Float64Array([379633.85, 39084.71, 3129.943]);
        // viewer.camera.target = new Float64Array([380036.613, 39459.857, 3066.088]);
        // viewer.camera.up = new Float64Array([0.084, 0.079, 0.993]);
        // viewer.camera.setField(554.132, 554.132);

        ////////////////////  DSX  ////////////////////
        // viewer.camera.position = [4534.13536450025, -501.29304410271106, 6326.3834468861605];
        // viewer.camera.target = [-2054.30631617336, 1352.5992892225586, -1919.8497340300992];
        // viewer.camera.up = [-0.7407187799518578, 0.2084275666168787, 0.6386655137869885];
        // viewer.camera.setField(10715.64557905293, 10715.64557905293);

        let labelList = [
          {
            properties: "标记点",
            position: [380222.688, 39141.488, 3240.095],
          },
        ];
        let labelArr = [];
        let bimAir = document.getElementsByClassName("viewer-wrp")[0];
        labelList.forEach((item, index) => {
          let div = document.createElement("div");
          let text = document.createTextNode("location");
          div.appendChild(text);
          div.style.position = "absolute";
          div.style.width = "70px";
          div.style.height = "20px";
          div.style.background = "#00FF00";
          // div.style.padding = "5px";
          div.style.border = "medium solid #000000"; // 边框
          // div.style.opacity = 0.5;  // 透明度
          div.addEventListener("click", () => {
            alert(labelList[index].properties);
          });
          bimAir.appendChild(div);
          labelArr.push(div);
        });
        console.log(bimAir);

        let positionList = labelList.map((item) => item.position);
        console.log(positionList);

        function updateLabels() {
          let pixelPos = viewer.worldPointToPixelPoint(positionList);
          labelArr.forEach((div, i) => {
            labelArr[i].style.left = pixelPos[i][0] + "px";
            labelArr[i].style.top = pixelPos[i][1] + "px";
          });
        }

        // 在视图刷新事件里添加更新标签的方法
        viewer.sceneCameraChanged.add(updateLabels);
        // 移除更新标签的方法
        // viewer.sceneCameraChanged.remove(updateLabels)

        //右键按下时禁用标签方法
        viewer.onLButtonDown.add(() => labelDisable);
        function labelDisable(sender, event) {
          labelArr.forEach((div, i) => {
            labelArr[i].style.pointerEvents = "none";
          });
        }
        //右键放开时启用标签方法
        viewer.onLButtonUp.add(() => labelEnable);
        function labelEnable(sender, event) {
          labelArr.forEach((div, i) => {
            labelArr[i].style.pointerEvents = "auto";
          });
        }
        viewer.updateDisplay();
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
