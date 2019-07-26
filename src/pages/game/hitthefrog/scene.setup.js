import * as THREE from 'three'

export default function (el) {
  let scene = new THREE.Scene();
  let light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
  let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  let renderer = new THREE.WebGLRenderer();
  let width = window.innerWidth
  let height = window.innerHeight
  renderer.setSize(width, height)
  scene.add(light)
  camera.position.z = 5

  el.appendChild(renderer.domElement)
  return {
    scene, 
    camera, 
    renderer,
    width,
    height
  }
}

