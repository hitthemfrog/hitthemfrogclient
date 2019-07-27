import * as THREE from 'three'


export default function (el) {
  let hudCanvas = document.createElement('canvas');
  let width = window.innerWidth 
  let height = window.innerHeight
  // Again, set dimensions to fit the screen.
  hudCanvas.width = width;
  hudCanvas.height = height;
  
  let hudBitmap = hudCanvas.getContext('2d');
  
  
  hudBitmap.font = "Normal 40px Arial";
  hudBitmap.textAlign = 'center';
  hudBitmap.fillStyle = "rgba(245,245,245,0.75)";
  hudBitmap.fillText('Test', width / 2, height / 2);

  
  // Create also a custom scene for HUD.
  let sceneHUD = new THREE.Scene();
  let hudTexture = new THREE.Texture(hudCanvas)
  hudTexture.needsUpdate = true;
  hudTexture.minFilter = THREE.LinearFilter

  // Create HUD material.
  let material = new THREE.MeshBasicMaterial({ map: hudTexture });
  material.transparent = true;

  // Create plane to render the HUD. This plane fill the whole screen.
  let planeGeometry = new THREE.PlaneGeometry(width, height);
  let plane = new THREE.Mesh(planeGeometry, material);
  sceneHUD.add(plane);

  let cameraHUD = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0, 30)

  const setScoreHUD = (text) => {
    hudBitmap.clearRect(0, 0, width, height);
    hudBitmap.fillText(text, width / 2, height / 2);
    hudTexture.needsUpdate = true
  }

  return {
    setScoreHUD,
    sceneHUD,
    cameraHUD,
  }
}








