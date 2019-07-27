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

function boxMesh(scene) {
  let cube = store.getState().frogs[0]

  if (!cube) {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    cube = new THREE.Mesh(geometry, material);
    store.dispatch(actions.addFrogScene(cube))
  }

  scene.add(cube)
  return cube
}

export default async function (scene) {
  let frogs = []
  let cube = boxMesh(scene)
  let frogObj = store.getState().frogs
  let count = 1
  
  let index = Math.round(Math.random() * 8)
  for (let i = 0; i < 9; i++) {
    if (i === index) cube.position.set(...pos[i])
    else {
      let frog = frogObj.length < 9 ? await importFrog(scene) : scene.add(frogObj[count])
      console.log('count',count)
      count++

      // let frog = await importFrog(scene)
      frog.position.set(...pos[i])
    }

    frogs.push()
  }
  
  console.log(frogObj)
  return { 
    frogs,
  }
}