import * as THREE from 'three'
import store from '../../../store/store'
import { actions } from '../../../store/game.action.reducer.type'

async function importFrog (scene) {
  return new Promise((resolve, reject) => {
    window.THREE = THREE;
    import('three/examples/js/loaders/GLTFLoader').then(() => {
      const gltfLoader = new window.THREE.GLTFLoader();
      gltfLoader.load('./models/simple.frog.glb', function (gltf) {
        let frogScene = gltf.scene
        store.dispatch(actions.addFrogScene(frogScene))
        scene.add(frogScene)
        resolve(frogScene)
      }, undefined, function (error) {
        console.error(error)
        reject(error)
      })
    })
  })
}

let pos = [
  [-2, 2, 0],
  [0, 2, 0],
  [2, 2, 0],
  [-2, 0, 0],
  [0, 0, 0],
  [2, 0, 0],
  [-2, -2, 0],
  [0, -2, 0],
  [2, -2, 0],
]

export default async function (scene) {
  let frogs = []
  for (let i = 0; i < 9; i++) {
    let frog = await importFrog(scene)
    frog.position.set(...pos[i])
    frogs.push()
  }
  return { 
    frogs,
  }
}