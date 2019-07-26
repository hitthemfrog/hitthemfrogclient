import * as THREE from 'three'
import store from '../../../store/store'
import { actions } from '../../../store/game.action.reducer.type'

function importFrog (scene) {
  window.THREE = THREE;
  import('three/examples/js/loaders/GLTFLoader').then(() => {
    const gltfLoader = new window.THREE.GLTFLoader();
    gltfLoader.load('./models/simple.frog.glb', function (gltf) {
      let frogScene = gltf.scene
      store.dispatch(actions.addFrogScene(frogScene))
      scene.add(frogScene)
    }, undefined, function (error) {
      console.error(error)
    })
  })
}

export default function (scene) {
  let cubes = []
  for (let i = 0; i < 3; i++) {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);
    cube.translateX(2 * i)
    cube.translateY(1 * i)
    cubes.push(cube)
  }

  let frog = importFrog(scene)
  cubes.forEach(cube => scene.add(cube))
  return { 
    cubes,
    frog,
  }
}