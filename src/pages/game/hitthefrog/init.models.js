import * as THREE from 'three'
import store from '../../../store/store'
import { actions } from '../../../store/game.action.reducer.type'

async function importModelObject (scene, model) {
  return new Promise((resolve, reject) => {
    window.THREE = THREE;
    import('three/examples/js/loaders/GLTFLoader').then(() => {
      const gltfLoader = new window.THREE.GLTFLoader();
      gltfLoader.load(model, function (gltf) {
        let modelScene = gltf.scene
        store.dispatch(actions.addFrogScene(modelScene))
        scene.add(modelScene)
        resolve(modelScene)
      }, undefined, function (error) {
        console.error(error)
        reject(error)
      })
    })
  })
}

const xyCoordinate = [
  [-2, 2, 0],
  [-4, 2, 0],
  [-6, 2, 0],
  [0, 2, 0],
  [2, 2, 0],
  [4, 2, 0],
  [6, 2, 0],
  [-2, 0, 0],
  [-4, 0, 0],
  [-6, 0, 0],
  [0, 0, 0],
  [2, 0, 0],
  [4, 0, 0],
  [6, 0, 0],
  [-2, -2, 0],
  [-4, -2, 0],
  [-6, -2, 0],
  [0, -2, 0],
  [2, -2, 0],
  [4, -2, 0],
  [6, -2, 0],
]

function randomCoordinate() {
  let result = []
  let i = 0

  while (i < 9) {
    let coordinate = Math.round(Math.random() * 20)

    if (!result.includes(coordinate)) result.push(coordinate) && i++
  }

  for(let i = 0; i < 9; i ++) {
    result[i] = xyCoordinate[result[i]]
  }
  
  return result
}

const prefix = (process.env.NODE_ENV === 'production') ? '/hitthemfrogclient' : ''

export default async function (scene) {
  const frogModel = prefix + '/models/simple.frog.glb'
  const monkeyModel = prefix + '/models/simple.frog.sad.glb'
  let frogs = []
  let frogObj = store.getState().frogs
  let monkey = frogObj.length ?  frogObj[0] : await importModelObject(scene, monkeyModel)
  let count = 1
  
  let coordinate = randomCoordinate()
  let index = Math.round(Math.random() * 8)
  for (let i = 0; i < 9; i++) {

    if (i === index)  {
      monkey.position.set(...coordinate[i])
      monkey.name = 'monkeyObjectScene'
      scene.add(monkey)
    } 
    else {
      let frog = (frogObj.length < 9) ? await importModelObject(scene, frogModel) : frogObj[count++]
      
      frog.position.set(...coordinate[i])
      scene.add(frog)
    }

    frogs.push()
  }
  
  return { 
    frogs,
  }
}