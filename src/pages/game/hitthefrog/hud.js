import * as THREE from 'three'


let width = window.innerWidth
let height = window.innerHeight

function createThree2dTextPlane () {
  let hudCanvas = document.createElement('canvas');
  hudCanvas.width = width;
  hudCanvas.height = height;
  let hudCanvasContext = hudCanvas.getContext('2d');
  hudCanvasContext.font = "Normal 30px Arial";
  hudCanvasContext.textAlign = 'center';
  hudCanvasContext.fillStyle = "rgba(245,245,245,1)";
  hudCanvasContext.fillText('', width / 2, height / 2);
  let hudTexture = new THREE.Texture(hudCanvas)
  hudTexture.needsUpdate = true;
  hudTexture.minFilter = THREE.LinearFilter
  let material = new THREE.MeshBasicMaterial({ map: hudTexture });
  material.transparent = true;
  let planeGeometry = new THREE.PlaneGeometry(width, height);
  let plane = new THREE.Mesh(planeGeometry, material);

  return {
    plane, hudCanvasContext, hudTexture
  }
}

function printStatus () {

}

export default function (el) {
  let p1 = createThree2dTextPlane()
  let p2 = createThree2dTextPlane()

  p1.plane.position.set(0, (window.innerHeight / 2) - 30, 0)
  p2.plane.position.set(0, (window.innerHeight / 2) - 50, 0)
  let sceneHUD = new THREE.Scene();

  sceneHUD.add(p1.plane)
  sceneHUD.add(p2.plane)
  let cameraHUD = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0, 30)

  const setScoreHUD = (player1, player2, countdown) => {
    p1.hudCanvasContext.clearRect(0, 0, width, height);
    p1.hudCanvasContext.fillText(`${player1.name} Hit: ${player1.hit} Miss: ${player1.miss} 
    Count Down: ${countdown}`, width / 2, height / 2);
    p1.hudTexture.needsUpdate = true

    p2.hudCanvasContext.clearRect(0, 0, width, height);
    p2.hudCanvasContext.fillText(`${player2.name} Hit: ${player2.hit} Miss: ${player2.miss} 
    Count Down: ${countdown}`, width / 2, height / 2);
    p2.hudTexture.needsUpdate = true
  }

  return {
    setScoreHUD,
    sceneHUD,
    cameraHUD,
  }
}








