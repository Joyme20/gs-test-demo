<template>
  <div class="demo-wrapper">
    <viewer-wrapper elementId="viewer" style="flex: 1" />
    <div class="toolbar"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BimAir, { Options, Viewer } from "gs-bim-air";
import {
  CommandPanoramaModelSelect,
  PanoramaObject,
  ProjectionType,
  Vector,
} from "gs-longan";
import fileService from "gs-bim-air/api/file/fileService";
import * as LonganCore from "gs-longan/longan/gs.viewer";

// import BimAir, {
//   Options,
//   Viewer,
// } from "../../../../../vue-ts-bimlight-platform/packages/bimAir/lib/BimAir.umd";
// import "../../../../../vue-ts-bimlight-platform/packages/bimAir/lib/BimAir.css";

Vue.use(BimAir.ViewerWrapper);

@Component({
  components: {},
})
export default class Index extends Vue {
  options: Options = {
    elementId: "viewer",
    // background: "linear-gradient(#e3fcfc, #f6ffff)",
    isShowLoading: false,
    modelService: "https://static.graphicstone.com/modelApi",
    fileService: "https://static.graphicstone.com/fileApi",
    toolbarVisible: {
      leftToolbar: false,
      rightToolbar: false,
      bottomToolbar: false,
    },
    components: {
      compass: {
        visible: false,
      },
    },
  };

  viewer: Viewer;

  mounted() {
    BimAir.Loader({
      isShareArrayBuffer: false,
    }).then(() => {
      let viewer = new BimAir.Viewer(this.options);
      viewer.sceneSegment.camera.projection = ProjectionType.Orthographic;
      viewer.sceneSegment.renderingOptions
        .setCullingMaximumExtent(0)
        .setViewFrustumCulling(false);
      this.viewer = viewer;

      let panoramaObject = new PanoramaObject();
      viewer.process.addRenderObject(null, panoramaObject);
      viewer.renderObject = panoramaObject;

      let textureURL = fileService.urls.file(
        this.options.fileService,
        "6375b168dcc0567781358bad"
      );
      this.initPanorama(textureURL, panoramaObject);
      this.viewer.process.commandManager.execute(
        new CommandPanoramaModelSelect()
      );
    });
  }

  initPanorama(textureURL, panoramaObject: PanoramaObject) {
    console.log("initPanorama");

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = textureURL;

    img.onload = () => {
      console.log("imgloaded");
      // 使用Points点列表生成Mesh
      let viewer = this.viewer;

      let imgWidth = img.width;
      let imgHeight = img.height;

      // 设置画布尺寸
      canvas.width = imgWidth;
      canvas.height = imgHeight;

      // 将图片按像素写入画布
      context!.drawImage(img, 0, 0, imgWidth, imgHeight);

      // 读取图片像素信息
      let imageData = context!.getImageData(0, 0, imgWidth, imgHeight);

      // 将整个球划分成32 * 32块瓦片
      let division = 32;

      LonganCore.JS_Open_Segment_By_Key(panoramaObject.segment.key);
      {
        LonganCore.JS_Set_Rendering_Options("cull back face=off");
        // LonganCore.JS_UnSet_One_Rendering_Option("lock face color");
        let imageName = "panoTexture";
        LonganCore.JS_Set_Color("faces=(diffuse=" + imageName + ")");
        let imageKey = LonganCore.JS_Insert_Image(
          0,
          0,
          0,
          imgWidth,
          imgHeight,
          imageData.data,
          "name=" + imageName + ",tiling=clamp"
        );
        LonganCore.JS_Set_Selectability("faces=off");

        for (let i = 0; i < division; i++) {
          for (let j = 0; j < division; j++) {
            let TL = panoramaObject.getLatLonFromTile(j, i, division);
            let BR = panoramaObject.getLatLonFromTile(j + 1, i + 1, division);

            // 每块瓦片划分为16 * 16个顶点
            let divNumber = 15;
            let pointNumber = divNumber + 1;

            // 生成Mesh点列表
            let points = panoramaObject.meshDivisionPolicy(TL, BR, divNumber);

            // 每个瓦片，生成一个Mesh.
            let meshKey = LonganCore.JS_Insert_Mesh(
              pointNumber,
              pointNumber,
              points
            );

            let UVs = new Array<number>((points.length / 3) * 2);

            for (let m = 0; m < pointNumber; m++) {
              for (let n = 0; n < pointNumber; n++) {
                UVs[(m * pointNumber + n) * 2 + 0] =
                  j / division + n / (pointNumber - 1) / division;
                UVs[(m * pointNumber + n) * 2 + 1] =
                  i / division + m / (pointNumber - 1) / division;
              }
            }

            LonganCore.JS_Set_Geometry_Texture_Coords(
              meshKey,
              0,
              pointNumber * pointNumber,
              UVs
            );
          }
        }
      }
      LonganCore.JS_Close_Segment();

      // 设置CameraPos在球体中心
      LonganCore.JS_Open_Segment_By_Key(viewer.sceneKey);
      {
        let origin = new Float32Array([0, 0, 0]);
        let pos = new Float32Array([0, 1, 0]);
        Vector.normalize(pos);
        let camUp = Vector.cross(pos, new Float32Array([1, 0, 0]));

        LonganCore.JS_Set_Camera_Target(origin);
        LonganCore.JS_Set_Camera_Position(pos);
        LonganCore.JS_Set_Camera_Up(camUp);

        LonganCore.JS_Set_Camera_Field(300, 300);
      }
      LonganCore.JS_Close_Segment();

      console.log("finish");
      viewer.updateDisplay();
    };
  }

  // beforeDestroy() {
  //   this.viewer.process.dispose();
  // }
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
