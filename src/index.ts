import { Component, Vue } from "vue-property-decorator";
// import { Options } from "../../../packages/bimAir/src/gsDevFx/options";

import BimAir, { Viewer } from "gs-bim-air";

import { PathType } from "gs-bim-air";

// 注册./property里的所有组件
const allComponents = require.context("./demo", false, /.*\.vue$/);
let resComponents = {};
// let comNames = [];
allComponents.keys().forEach((fileName) => {
  // comNames.push(fileName.replace("./", "").replace(".vue", ""));
  let comp = allComponents(fileName);
  resComponents[fileName.replace(/^\.\/(.*)\.\w+$/, "$1")] = comp.default;
});
console.log("comNames", resComponents);

Vue.use(BimAir.ViewerWrapper);

@Component({
  components: {
    // GsHeader,
    // BimAir
  },
})
export default class Index extends Vue {
  modelName = "";
  // modelId = ""
  components = resComponents;
  // currentComponent = "viewerWrapper";
  currentComponent = null;
  options = {
    // viewerType: "model",
    elementId: "viewer",
    // id: this.$route.query.modelId as string,
    // modelService: "http://8.134.85.254:9034/api",
    // fileService: "http://8.134.85.254:9040/api",
    // loaderUrl: "https://static.graphicstone.com",
    // modelService: "https://static.graphicstone.com/modelApi",
    // fileService: "https://static.graphicstone.com/fileApi",
    background: "linear-gradient(#e3fcfc, #f6ffff)",
    isShowLoading: true,

    toolbarVisible: {
      // leftToolbar: false,
      // rightToolbar: false,
      // bottomToolbar: false,
    },
    components: {
      // 罗盘配置
      compass: {
        visible: true,
      },
      // property: [
      //       {
      //       name: "11111",
      //       component: () => import("../../../packages/bimAir/src/viewerWrapper/commands/showCut/showElementCut/showElementCut.vue")
      //   }
      // ],
      structureTree: {
        tabClickFun: (data) => {
          console.log("--------------", data);
        },
        defaultTab: {
          visible: true,
          clickFun: (data) => {
            console.log("--------------", data);
          },
          checkFun: (
            data,
            { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }
          ) => {
            console.log("checkFun-------", data, {
              checkedNodes,
              checkedKeys,
              halfCheckedNodes,
              halfCheckedKeys,
            });
          },
        },
        tabs: [
          // {
          //   name: "结构树222",
          //   component: () =>
          //     import(
          //       "../../../packages/bimAir/src/viewerWrapper/panels/structureTree/panes/structureTree.vue"
          //     ),
          // },
        ],
      },
      bottomToolbarButtons: [
        // {
        //     title: "测试围栏",
        //     clickFun: () => {
        //         store.state.viewer.process.commandManager.execute(CommandCreateWall.instance)
        //         // Longan.Process.activeProcess.commandManager.execute(CommandCreateWall.instance)
        //     },
        //     active: false,
        //     icon: "iconfont icon-shuxing"
        // }
      ],
      roamToolbar: {
        pathRoam: {
          visible: false,
        },
        buttons: [
          {
            title: "测试围栏",
            clickFun: () => {},
            active: false,
            icon: "iconfont icon-shuxing",
          },
        ],
      },
    },
  };

  options2 = {
    // viewerType: "model",
    elementId: "viewer2",
    // id: this.$route.query.modelId as string,
    // modelService: "http://8.134.85.254:9034/api",
    // fileService: "http://8.134.85.254:9040/api",
    // loaderUrl: "https://static.graphicstone.com",
    // modelService: "https://static.graphicstone.com/modelApi",
    // fileService: "https://static.graphicstone.com/fileApi",
    modelService: "http://111.44.214.189:8301", //玛尔挡模型服务
    background: "linear-gradient(#e3fcfc, #f6ffff)",
    isShowLoading: true,

    toolbarVisible: {
      // leftToolbar: false,
      // rightToolbar: false,
      // bottomToolbar: false,
    },
  };
  viewer: Viewer;

  componentName = null;

  demoClick(component) {
    this.currentComponent = component;
  }

  mounted() {
    // this.currentComponent = this.components["设置视角test"];
    this.currentComponent = this.components["相机设置视角"];
    // this.currentComponent = this.components["isolation"];

    return;
    BimAir.Loader({
      // key: "681fe1e77ec44cd88af1620c1b2bffc2",
      // secret: "NjgxZmUxZTc3ZWM0NGNkODhhZjE2MjBjMWIyYmZmYzI=",
      isShareArrayBuffer: false,
    }).then(() => {
      let viewer = new BimAir.Viewer(this.options);
      // setTimeout(() => {
      //   viewer.options.components.structureTree.defaultTab.visible = true;
      //   viewer.options.components.structureTree.activeTabName = "结构树222";
      //   viewer.options.components.structureTree.tabs = [
      //     {
      //       name: "结构树222",
      //       component: () =>
      //         import(
      //           "../../../packages/bimAir/src/viewerWrapper/panels/structureTree/panes/structureTree.vue"
      //         ),
      //     },
      //     {
      //       name: "结构树223",
      //       component: () =>
      //         import(
      //           "../../../packages/bimAir/src/viewerWrapper/panels/structureTree/panes/structureTree.vue"
      //         ),
      //     },
      //   ];
      // }, 5000);
      // viewer.isUpdateTt = true;
      viewer.instanceObjectSegment.renderingOptions.LogarithmicDepthBuffer =
        true;
      // viewer.panelManager.structureTree.toggleCallback = (visible) => {
      //   console.log("visible", visible);
      // };

      // viewer.getComponents(componentId)
      // viewer.camera.projection = BimAir.Longan.ProjectionType.Orthographic;

      // cubeSeg.ins
      // let config: Config
      // this.axios.get("./config/config.json").then((data: any) => {
      //   config = data
      // })
      // viewer.loadRenderObjects([
      // 	"8f15b9b0-96a0-4abf-a197-8c281db9d9db", //1个钻孔
      // 	// "4aa69855-4cbe-49f7-aff5-e51b94e96d4a", //钻孔
      // 	// "7b7f893d-3d6c-44c2-8e57-0bbf5f30de87", //平硐
      // ]);

      // 	.then(() => {
      // 		console.log(
      // 			"-------",
      // 			viewer.structureTreeManager.rootNode,
      // 			viewer.panelManager.structureTree.componentData
      // 		);
      // 	});
      viewer
        .loadModels(
          [
            {
              id: this.$route.query.modelId as string,
              version: Number(this.$route.query.version),
            },
          ],
          true,
          true
        )
        .then((lightModels) => {
          console.log("viewer.renderObject.name", viewer.renderObject.name);
          this.modelName = viewer.renderObject.name;
          // viewer.setViewMode(Longan.ViewMode.Iso, true);

          // pathRoam(viewer);

          // setTimeout(() => {
          //   // let com = lightModels[0].getComponent("pdms_0f807e4fd9c3bee5346cfd26761a7c71")
          //   // let coms = com.treeNodeOject.
          //   let ids = [
          //     "pdms_4bee92168f0d840badcfe8329dc9f721",
          //     "pdms_b4c35af031e699dc49db8754f9225b46",
          //     "pdms_e00a901825df70cb6bdce51682923b57",
          //     "pdms_9e27f83a017e5e671d303426a9325099",
          //     "pdms_db37b71f1f51480eb8cea55ae07f4df0",
          //     "pdms_ea0b8295d8c43a95bb3743aeeedbfd0f",
          //     "pdms_7ed5b95b1f489e9c1829ade01becf001",
          //     "pdms_d3929a04ce5b98d1473f6f80ca2e4a1f",
          //     "pdms_bb6c1827c0ca62704ae3050110afb234",
          //   ];
          //   ids.forEach((id) => {
          //     let com = lightModels[0].getComponent(id);

          //     console.log("aaa--------", com);
          //   });

          //   lightModels[0].setComponentsVisible(ids, false);
          // }, 10000);

          // viewer.loadLocalModel("./test.gsl", "tttt").then((model: any) => {
          //   // model.treeNodeObject.isShow = false;
          // });
        });

      return;

      viewer.loadModels(
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
      );

      // viewer.clearCache();
      return;
      viewer
        .loadModels(
          [
            {
              id: this.$route.query.modelId as string,
              version: Number(this.$route.query.version),
            },
            // {
            //   id: "937c8b64-9066-4eb5-ad8d-fe7951e320c4"
            // }
          ],
          true,
          true
        )
        .then((lightModels) => {
          this.modelName = viewer.renderObject.name;
          // viewer.setViewMode(Longan.ViewMode.Iso, true);

          // let material1 = new BimAir.Material(viewer, "test");

          // material1.setColor(127, 250, 0, 1);

          // let objcet1 = lightModels[0].segmentObject;
          // objcet1.setMaterial(material1);

          // let m = new BimAir.Material(viewer, "test1");
          // m.setColor(255, 0, 0);

          // let com = lightModels[0].getComponent("QMD+M+4G+HYD+XDRA01+EL001");
          // lightModels[0].setComponentsColor([com.componentId], m);
          // console.log("componentId", com.componentId);
          // viewer.updateDisplay();
          // lightModels[0].treeNodeObject.segmentObject.setMaterial();

          // let segments = [];
          // viewer.structureTreeManager.getComponents(lightModels[0].treeNodeObject, segments);

          // segments.forEach((seg: SegmentObject) => {
          // 	let segment = new Longan.Segment(seg.key);
          // 	segment.computeBoundingBox();
          // 	let bb = viewer.computeViewBoundingBox(segment);

          // 	viewer.utilitySegment.insertPolyline([
          // 		bb[0],
          // 		bb[1],
          // 		bb[2],
          // 		bb[3],
          // 		bb[1],
          // 		bb[2],
          // 		bb[3],
          // 		bb[4],
          // 		bb[2],
          // 		bb[0],
          // 		bb[4],
          // 		bb[2],
          // 		bb[0],
          // 		bb[1],
          // 		bb[2],
          // 	]);
          // });

          // let node1 = viewer.structureTreeManager.getTreeNodesByName("MED-C-01-CF-ZCF-000-001(2#机组)")
          // 	.items[0];
          // let node2 = viewer.structureTreeManager.getTreeNodesByName("1#MED-C-01-CF-ZCF-000-001(1#机组)")
          // 	.items[0];

          // let segments1 = [];
          // let segments2 = [];
          // viewer.structureTreeManager.getComponents(node1, segments1);
          // viewer.structureTreeManager.getComponents(node2, segments2);

          // let keys1 = new Int32Array(segments1.length);
          // let keys2 = new Int32Array(segments2.length);
          // for (let i = 0; i < segments1.length; i++) {
          // 	keys1[i] = (segments1[i] as SegmentObject).key;
          // }
          // for (let i = 0; i < segments2.length; i++) {
          // 	keys2[i] = (segments2[i] as SegmentObject).key;
          // }

          // viewer.collisionComputing.add((viewer: Viewer, total: number, current: number) => {
          // 	console.log(total, current);
          // });

          // viewer.collisionComputed.add((viewer: Viewer, count: number) => {
          // 	console.log("total: ", count);
          // });
          // JS_Compute_Collision_By_Keys_Tt(
          // 	viewer.viewKey,
          // 	keys1,
          // 	keys2,
          // 	Longan.CollisionType.Intersect |
          // 		Longan.CollisionType.Contain |
          // 		Longan.CollisionType.Touch |
          // 		Longan.CollisionType.Soft
          // );

          // viewer.updateDisplay();

          // viewer.camera.projection = BimAir.Longan.ProjectionType.Perspective;

          // this.addAditClick(viewer);
          // this.addHoleClick(viewer);
          // console.log(viewer.temporaryObjectManager.treeNode, viewer.temporaryObjectManager.lightModel)

          // let params = [0, 0, 0];
          // let axis = [0, 0, 1];
          // let length = 0;
          // params = params.concat([...axis]);
          // params.push(length);
          // params.push(500);
          // viewer.utilitySegment.insertParametricGeometry("ssph", params);

          // viewer.updateDisplay();

          // this.axios.get("./test/TestProject.umd.js").then((res: any) => {
          //   console.log("res------", res)
          //   eval(res)
          // })
          // let option = {
          //   path: "test/TestProject.umd.js",
          //   namespace: "Test",
          //   component: "TestProject"
          // }

          // setTimeout(() => {
          //   this.loadScript(option.path).then(() => {
          //     this.componentName = (window as any)[option.namespace][option.component][option.component]
          //     // console.log((window as any).Test)
          //     // Vue.use((window as any).Test.TestPproject)
          //   })
          // }, 0)

          // this.loadScript("test/test.js").then(() => {
          //   // this.componentName = "TestProject"
          //   // Vue.use()
          // })

          // require(path.join(__dirname, "public/testProject/test.js"))

          // let string = `let test = require("../../../packages/testProject/src/index")
          // this.componentName = test.default.TestProject.TestProject
          // Vue.use(this.componentName)

          // console.log("test-----", test, this.componentName)`
          // eval(string)

          // let test = import("../../../packages/testProject/src/index")
          // test.then(res => {
          //   console.log("test-----", res.default.TestProject,)
          //   this.componentName = res.default.TestProject.TestProject
          // })

          // this.componentName = test.TestProject.TestProject
          // Vue.use(this.componentName)

          // setTimeout(() => {

          viewer.camera.position = [
            380140.470678195, 39512.29711239873, 3148.555238589706,
          ];
          viewer.camera.target = [
            379960.90625, 39503.16015625, 3032.277587890625,
          ];
          viewer.camera.up = [
            -0.4082482904638631, 0.408248290463863, 0.816496580927726,
          ];
          viewer.camera.setField(217.112, 217.112);

          viewer.updateDisplay();
          // }, 3000)

          // console.log("lightModels------------", lightModels)
          // if (config.faceEmissive) {
          //   (viewer.instanceObject.segment as Longan.Segment).color.faceEmissive = config.faceEmissive
          // }
          // setTimeout(() => {
          //   console.log("viewer.panelManager.structureTree.ref", viewer.panelManager.structureTree.ref)
          // }, 5000)
        });

      // viewer = new BimAir.Viewer(this.options);

      // let options2 = {
      //   elementId: "viewer2",
      //   modelService: "http://8.134.85.254:9036/api",
      //   fileService: "http://8.134.85.254:9040/api",
      // };
      // let viewer2 = new BimAir.Viewer(options2)
      // viewer2
      //   .loadModels(
      //     "629577fbbc7dff4fe318bc17",
      //     true,
      //     true
      //   )
      // setTimeout(() => {
      //   viewer2.dispose();
      //   this.isShow = false;
      //   setTimeout(() => {
      //     viewer.updateSize();
      //   }, 0);
      // }, 5000);
    });
  }

  loadScript(src): Promise<void> {
    return new Promise((resolve, reject) => {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = src;
      script.onload = () => {
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  // animationTest
  animationTest() {
    BimAir.Loader({ isShareArrayBuffer: true }).then(() => {
      let viewer = new BimAir.Viewer(this.options);
      viewer.isUpdateTt = true;

      // 厂房Id
      let modelId = "62b2f7aa3a591513fe1799b5";
      // 肘管模型Id
      let carObjId = "62b2f7a73a591513fe1799a9";
      viewer
        .loadModels([
          { id: modelId, version: 0 },
          { id: carObjId, version: 0 },
        ])
        .then((lightModels) => {
          console.log("roam Test");
          this.modelName = viewer.renderObject.name;

          // 肘管模型
          let moveModel = lightModels[1];

          // 动画移动的对象
          let moveObjId = "QMD+M+4G+HYD+XDRA01+EL002";
          let moveSegmentObject = moveModel.getComponent(moveObjId);

          let bb = viewer.computeViewBoundingBox(moveSegmentObject.segment);
          let center = new Float64Array([
            (bb[0] + bb[3]) / 2,
            (bb[1] + bb[4]) / 2,
            (bb[2] + bb[5]) / 2,
          ]);

          let p0 = new BimAir.Longan.Point();
          p0[0] = center[0];
          p0[1] = center[1];
          p0[2] = center[2] + 30;

          let p1 = new BimAir.Longan.Point();
          p1[0] = center[0];
          p1[1] = center[1];
          p1[2] = center[2];

          let p2 = new BimAir.Longan.Point();
          p2[0] = 380022.3124998525;
          p2[1] = 39484.624999855165;
          p2[2] = 3072.023193359375;

          let points = new Array();
          points.push(p0);
          points.push(p1);
          // points.push(p2);

          // 绘制路径点线段(用来看的).
          viewer.process.animationManager.drawStraight(viewer, points);

          // 漫游时长
          let roamTime = 5;
          // 添加路径动画并返回动画事件的Id.
          // 添加动画1
          let animationId1 =
            viewer.process.animationManager.objectRoamWithoutRotate(
              viewer,
              moveSegmentObject,
              points,
              roamTime,
              PathType.Straight,
              () => {
                console.log("finish1");
              }
            );

          let animationId2 = "";
          setTimeout(() => {
            let moveObjId = "QMD+M+4G+HYD+XDRA01+EL001";
            // 动画2移动的对象
            let moveSegmentObject = moveModel.getComponent(moveObjId);

            let bb = viewer.computeViewBoundingBox(moveSegmentObject.segment);
            let center = new Float64Array([
              (bb[0] + bb[3]) / 2,
              (bb[1] + bb[4]) / 2,
              (bb[2] + bb[5]) / 2,
            ]);

            let p0 = new BimAir.Longan.Point();
            p0[0] = center[0];
            p0[1] = center[1];
            p0[2] = center[2] + 30;

            let p1 = new BimAir.Longan.Point();
            p1[0] = center[0];
            p1[1] = center[1];
            p1[2] = center[2];

            let p2 = new BimAir.Longan.Point();
            p2[0] = 380022.3124998525;
            p2[1] = 39484.624999855165;
            p2[2] = 3072.023193359375;

            let points = new Array();
            points.push(p0);
            points.push(p1);
            // points.push(p2);

            // 添加动画2
            animationId2 =
              viewer.process.animationManager.objectRoamWithoutRotate(
                viewer,
                moveSegmentObject,
                points,
                roamTime,
                PathType.Straight,
                () => {
                  console.log("finish2");
                }
              );
          }, 5000);

          // 在两秒后,播放全部动画,此时只有动画1
          setTimeout(() => {
            viewer.process.animationManager.run([animationId2, animationId1]);
          }, 7000);
        });
    });
  }

  animationTestMultiViewer() {
    BimAir.Loader({ isShareArrayBuffer: true }).then(() => {
      let viewer = new BimAir.Viewer(this.options);
      viewer.isUpdateTt = true;

      // 厂房Id
      let modelId = "62b2f7aa3a591513fe1799b5";
      // 肘管模型Id
      let carObjId = "62b2f7a73a591513fe1799a9";
      viewer
        .loadModels([
          { id: modelId, version: 0 },
          { id: carObjId, version: 0 },
        ])
        .then((lightModels) => {
          console.log("roam Test");
          this.modelName = viewer.renderObject.name;

          let moveModel = lightModels[1];

          // 动画移动的对象
          let moveObjId = "QMD+M+4G+HYD+XDRA01+EL002";
          let moveSegmentObject = moveModel.getComponent(moveObjId);

          let bb = viewer.computeViewBoundingBox(moveSegmentObject.segment);
          let center = new Float64Array([
            (bb[0] + bb[3]) / 2,
            (bb[1] + bb[4]) / 2,
            (bb[2] + bb[5]) / 2,
          ]);

          let p0 = new BimAir.Longan.Point();
          p0[0] = center[0];
          p0[1] = center[1];
          p0[2] = center[2] + 30;

          let p1 = new BimAir.Longan.Point();
          p1[0] = center[0];
          p1[1] = center[1];
          p1[2] = center[2];

          let p2 = new BimAir.Longan.Point();
          p2[0] = 380022.3124998525;
          p2[1] = 39484.624999855165;
          p2[2] = 3072.023193359375;

          let points = new Array();
          points.push(p0);
          points.push(p1);
          // points.push(p2);

          // 绘制路径点线段(用来看的).
          viewer.process.animationManager.drawStraight(viewer, points);

          // 漫游时长
          let roamTime = 8;
          // 添加路径动画并返回动画事件的Id.
          // 添加动画1
          let animationId1 =
            viewer.process.animationManager.objectRoamWithoutRotate(
              viewer,
              moveSegmentObject,
              points,
              roamTime,
              PathType.Straight,
              () => {
                console.log("finish1");

                let moveObjId = "QMD+M+4G+HYD+XDRA01+EL001";
                // 动画2移动的对象
                let moveSegmentObject = moveModel.getComponent(moveObjId);

                let bb = viewer.computeViewBoundingBox(
                  moveSegmentObject.segment
                );
                let center = new Float64Array([
                  (bb[0] + bb[3]) / 2,
                  (bb[1] + bb[4]) / 2,
                  (bb[2] + bb[5]) / 2,
                ]);

                let p0 = new BimAir.Longan.Point();
                p0[0] = center[0];
                p0[1] = center[1];
                p0[2] = center[2] + 30;

                let p1 = new BimAir.Longan.Point();
                p1[0] = center[0];
                p1[1] = center[1];
                p1[2] = center[2];

                let p2 = new BimAir.Longan.Point();
                p2[0] = 380022.3124998525;
                p2[1] = 39484.624999855165;
                p2[2] = 3072.023193359375;

                let points = new Array();
                points.push(p0);
                points.push(p1);
                // points.push(p2);

                // 添加动画2
                let animationId2 =
                  viewer.process.animationManager.objectRoamWithoutRotate(
                    viewer,
                    moveSegmentObject,
                    points,
                    roamTime,
                    PathType.Straight,
                    () => {
                      console.log("finish2");
                    }
                  );

                viewer.process.animationManager.run([animationId2]);
              }
            );
        });

      setTimeout(() => {
        viewer.process.animationManager.run();
      }, 2000);

      let viewer2 = new BimAir.Viewer(this.options2);
      viewer2.isUpdateTt = true;

      viewer2
        .loadModels([
          { id: modelId, version: 0 },
          { id: carObjId, version: 0 },
        ])
        .then((lightModels) => {
          console.log("roam Test");
          this.modelName = viewer2.renderObject.name;

          let moveModel = lightModels[1];

          // 动画移动的对象
          let moveObjId = "QMD+M+4G+HYD+XDRA01+EL004";
          let moveSegmentObject = moveModel.getComponent(moveObjId);

          let bb = viewer2.computeViewBoundingBox(moveSegmentObject.segment);
          let center = new Float64Array([
            (bb[0] + bb[3]) / 2,
            (bb[1] + bb[4]) / 2,
            (bb[2] + bb[5]) / 2,
          ]);

          let p0 = new BimAir.Longan.Point();
          p0[0] = center[0];
          p0[1] = center[1];
          p0[2] = center[2] + 30;

          let p1 = new BimAir.Longan.Point();
          p1[0] = center[0];
          p1[1] = center[1];
          p1[2] = center[2];

          let p2 = new BimAir.Longan.Point();
          p2[0] = 380022.3124998525;
          p2[1] = 39484.624999855165;
          p2[2] = 3072.023193359375;

          let points = new Array();
          points.push(p0);
          points.push(p1);
          // points.push(p2);

          // 绘制路径点线段(用来看的).
          viewer2.process.animationManager.drawStraight(viewer2, points);

          // 漫游时长
          let roamTime = 15;
          // 添加路径动画并返回动画事件的Id.
          // 添加动画1
          let animationId1 =
            viewer2.process.animationManager.objectRoamWithoutRotate(
              viewer2,
              moveSegmentObject,
              points,
              roamTime,
              PathType.Straight,
              () => {
                console.log("finish1");
              }
            );

          let animationId2 = "";
          setTimeout(() => {
            let moveObjId = "QMD+M+4G+HYD+XDRA01+EL005";
            // 动画2移动的对象
            let moveSegmentObject = moveModel.getComponent(moveObjId);

            let bb = viewer2.computeViewBoundingBox(moveSegmentObject.segment);
            let center = new Float64Array([
              (bb[0] + bb[3]) / 2,
              (bb[1] + bb[4]) / 2,
              (bb[2] + bb[5]) / 2,
            ]);

            let p0 = new BimAir.Longan.Point();
            p0[0] = center[0];
            p0[1] = center[1];
            p0[2] = center[2] + 30;

            let p1 = new BimAir.Longan.Point();
            p1[0] = center[0];
            p1[1] = center[1];
            p1[2] = center[2];

            let p2 = new BimAir.Longan.Point();
            p2[0] = 380022.3124998525;
            p2[1] = 39484.624999855165;
            p2[2] = 3072.023193359375;

            let points = new Array();
            points.push(p0);
            points.push(p1);
            // points.push(p2);

            // 添加动画2
            animationId2 =
              viewer2.process.animationManager.objectRoamWithoutRotate(
                viewer2,
                moveSegmentObject,
                points,
                roamTime,
                PathType.Straight,
                () => {
                  console.log("finish2");
                }
              );
          }, 5000);

          // 在两秒后,播放全部动画,此时只有动画1
          setTimeout(() => {
            viewer2.process.animationManager.run();
          }, 2000);
        });
    });
  }

  animationTestMultiViewer2() {
    BimAir.Loader({ isShareArrayBuffer: true }).then(() => {
      let viewer = new BimAir.Viewer(this.options);
      viewer.isUpdateTt = true;

      // 厂房Id
      let modelId = "62b2f7aa3a591513fe1799b5";
      // 肘管模型Id
      let carObjId = "62b2f7a73a591513fe1799a9";
      viewer
        .loadModels([
          // { id: modelId, version: 0 },
          { id: carObjId, version: 0 },
        ])
        .then((lightModels) => {
          console.log("roam Test");
          this.modelName = viewer.renderObject.name;

          let moveModel = lightModels[0];

          // 动画移动的对象
          let moveObjId = "QMD+M+4G+HYD+XDRA01+EL002";
          let moveSegmentObject = moveModel.getComponent(moveObjId);

          let bb = viewer.computeViewBoundingBox(moveSegmentObject.segment);
          let center = new Float64Array([
            (bb[0] + bb[3]) / 2,
            (bb[1] + bb[4]) / 2,
            (bb[2] + bb[5]) / 2,
          ]);

          let p0 = new BimAir.Longan.Point();
          p0[0] = center[0];
          p0[1] = center[1];
          p0[2] = center[2] + 30;

          let p1 = new BimAir.Longan.Point();
          p1[0] = center[0];
          p1[1] = center[1];
          p1[2] = center[2];

          let p2 = new BimAir.Longan.Point();
          p2[0] = 380022.3124998525;
          p2[1] = 39484.624999855165;
          p2[2] = 3072.023193359375;

          let points = new Array();
          points.push(p0);
          points.push(p1);
          // points.push(p2);

          // 绘制路径点线段(用来看的).
          viewer.process.animationManager.drawStraight(viewer, points);

          // 漫游时长
          let roamTime = 8;
          // 添加路径动画并返回动画事件的Id.
          // 添加动画1
          let animationId1 =
            viewer.process.animationManager.objectRoamWithoutRotate(
              viewer,
              moveSegmentObject,
              points,
              roamTime,
              PathType.Straight,
              () => {
                console.log("finish1");
              }
            );

          setTimeout(() => {
            viewer.process.animationManager.run();
          }, 2000);

          viewer.fitWorld();
        });

      let viewer2 = new BimAir.Viewer(this.options2);
      viewer2.isUpdateTt = true;

      viewer2
        .loadModels([
          // { id: modelId, version: 0 },
          { id: carObjId, version: 0 },
        ])
        .then((lightModels) => {
          console.log("roam Test");
          this.modelName = viewer2.renderObject.name;

          let moveModel = lightModels[0];

          // 动画移动的对象
          let moveObjId = "QMD+M+4G+HYD+XDRA01+EL004";
          let moveSegmentObject = moveModel.getComponent(moveObjId);

          let bb = viewer2.computeViewBoundingBox(moveSegmentObject.segment);
          let center = new Float64Array([
            (bb[0] + bb[3]) / 2,
            (bb[1] + bb[4]) / 2,
            (bb[2] + bb[5]) / 2,
          ]);

          let p0 = new BimAir.Longan.Point();
          p0[0] = center[0];
          p0[1] = center[1];
          p0[2] = center[2] + 30;

          let p1 = new BimAir.Longan.Point();
          p1[0] = center[0];
          p1[1] = center[1];
          p1[2] = center[2];

          let p2 = new BimAir.Longan.Point();
          p2[0] = 380022.3124998525;
          p2[1] = 39484.624999855165;
          p2[2] = 3072.023193359375;

          let points = new Array();
          points.push(p0);
          points.push(p1);
          // points.push(p2);

          // 绘制路径点线段(用来看的).
          viewer2.process.animationManager.drawStraight(viewer2, points);

          // 漫游时长
          let roamTime = 15;
          // 添加路径动画并返回动画事件的Id.
          // 添加动画1
          let animationId1 =
            viewer2.process.animationManager.objectRoamWithoutRotate(
              viewer2,
              moveSegmentObject,
              points,
              roamTime,
              PathType.Straight,
              () => {
                console.log("finish1");
              }
            );

          setTimeout(() => {
            viewer2.process.animationManager.run();
          }, 2000);
          viewer2.fitWorld();
        });
    });
  }

  ttttt() {
    BimAir.Loader({ isShareArrayBuffer: true }).then(() => {
      let viewer = new BimAir.Viewer(this.options);
      let viewer2 = new BimAir.Viewer(this.options2);
      let id = "62ba4f263a591513fe17d896";
      let model1 = "62ba4f503a591513fe17d930"; // 4肘管模型Id
      let model2 = "62ba4f473a591513fe17d919"; //  4锥管模型Id
      let model3 = "62ba4f5b3a591513fe17d93d"; // 4蜗壳
      let model4 = "62ba4f393a591513fe17d8fe"; // 4座环
      let model5 = "62ba4f5f3a591513fe17d941"; // 4机坑里衬
      let m6 = "62c2858503225b3400faa7cc"; // 3座环
      let m7 = "62c2857e03225b3400faa7a9"; // 3肘管
      let m8 = "62c2857b03225b3400faa798"; // 3#蜗壳FA
      let m9 = "62c2856203225b3400faa74e"; // 2座环

      viewer.loadModels([id, model1], true).then((lightModels) => {
        lightModels[0].setAllComponentsVisible(false);
        let moveObjId = "QMD+M+4G+HYD+XDRA01+EL002";
        let moveSegmentObject = lightModels[1].getComponent(moveObjId);
        lightModels[1].setComponentsIsolation([moveObjId], true, false);

        let bb = viewer.computeViewBoundingBox(moveSegmentObject.segment);
        let center = new Float64Array([
          (bb[0] + bb[3]) / 2,
          (bb[1] + bb[4]) / 2,
          (bb[2] + bb[5]) / 2,
        ]);

        let p0 = new BimAir.Longan.Point();
        p0[0] = center[0];
        p0[1] = center[1];
        p0[2] = center[2] + 50;

        let p1 = new BimAir.Longan.Point();
        p1[0] = center[0];
        p1[1] = center[1];
        p1[2] = center[2];

        let points = new Array();
        points.push(p0);
        points.push(p1);

        viewer.process.animationManager.drawStraight(viewer, points);

        // 漫游时长
        let roamTime = 10;
        // 添加路径动画并返回动画事件的Id.
        // 添加动画1

        let animationId1 =
          viewer.process.animationManager.objectRoamWithoutRotate(
            viewer,
            moveSegmentObject,
            points,
            roamTime,
            0,
            () => {
              console.log("finish1");
            }
          );

        viewer.process.animationManager.run();
        viewer.fitWorld();
      });
      viewer.modelDebug = true;

      viewer2.loadModels([m9, m8], true).then((lightModels2) => {
        // viewer2.fitWorld();
        let moveObjId2 = lightModels2[0];
        let bb2 = viewer2.computeViewBoundingBox(moveObjId2.segment);
        let center2 = new Float64Array([
          (bb2[0] + bb2[3]) / 2,
          (bb2[1] + bb2[4]) / 2,
          (bb2[2] + bb2[5]) / 2,
        ]);

        let p00 = new BimAir.Longan.Point();
        p00[0] = center2[0];
        p00[1] = center2[1] + 60;
        p00[2] = center2[2];

        let p01 = new BimAir.Longan.Point();
        p01[0] = center2[0];
        p01[1] = center2[1];
        p01[2] = center2[2];

        let points2 = new Array();
        points2.push(p00);
        points2.push(p01);

        // viewer2.process.animationManager.drawStraight(viewer2, points2);

        // 漫游时长
        let roamTime = 10;
        let animationId2 =
          viewer2.process.animationManager.objectRoamWithoutRotate(
            viewer2,
            moveObjId2.segmentObject,
            points2,
            roamTime,
            0,
            () => {
              console.log("finish2");
            }
          );

        viewer2.process.animationManager.run([animationId2]);
        viewer2.fitWorld();
      });
    });
  }
}
