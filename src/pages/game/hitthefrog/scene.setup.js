import * as THREE from 'three'

export default function (el, socket) {
  let scene = new THREE.Scene();
  let light = new THREE.HemisphereLight(0xffffbb, 0x080820, 4)
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  let renderer = new THREE.WebGLRenderer({ alpha: true })
  renderer.autoClear =false
  // scene.background = new THREE.Color(0xE5E4D7, 0);
  let width = window.innerWidth
  let height = window.innerHeight
  renderer.setSize(width, height)
  scene.add(light)
  camera.position.z = 6
  camera.position.y = 1

  el.appendChild(renderer.domElement)
  return {
    scene, 
    camera, 
    renderer,
    width,
    height
  }
}

