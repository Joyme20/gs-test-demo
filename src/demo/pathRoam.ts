import { Viewer } from "gs-bim-air";
export default function pathRoam(viewer: Viewer) {
  let points = [
    {
      "0": 380416.0671187355,
      "1": 38786.28087566431,
      "2": 4155.782292435952,
    },
    {
      "0": 380730.74617450393,
      "1": 38801.12997364584,
      "2": 4404.750407980944,
    },
    {
      "0": 380406.14820238814,
      "1": 38604.5974913866,
      "2": 4586.35800090969,
    },
    {
      "0": 380261.32870820834,
      "1": 38596.66147364602,
      "2": 4579.3149458984135,
    },
    {
      "0": 380395.3445379988,
      "1": 38641.34803364585,
      "2": 6989.755320839406,
    },
  ];
  let targets = [
    {
      "0": 379975.34973484656,
      "1": 39356.55973798728,
      "2": 2473.4870208851316,
    },
    {
      "0": 380290.028790615,
      "1": 39371.4088359688,
      "2": 2722.455136430124,
    },
    {
      "0": 379965.4308184992,
      "1": 39174.876353709566,
      "2": 2904.0627293588705,
    },
    {
      "0": 379911.16665493266,
      "1": 39145.07510593635,
      "2": 2868.7021322205796,
    },
    {
      "0": 380199.14883022045,
      "1": 38749.08093629171,
      "2": 5173.311531482929,
    },
  ];

  let animationId = viewer.animationManager.pathRoam.addRoamPathAnime(
    10,
    points,
    targets
  );
  viewer.animationManager.pathRoam.run([animationId]);

  let camera = viewer.animationManager.pathRoam.getRoamPoint();
  console.log("camera", camera);

  setTimeout(() => {
    viewer.animationManager.pathRoam.pauseAnime(animationId);
  }, 3000);

  setTimeout(() => {
    // viewer.animationManager.pathRoam.restartAnime(animationId);
    viewer.animationManager.pathRoam.run([animationId]);
  }, 6000);
}
