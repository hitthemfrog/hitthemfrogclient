import * as THREE from 'three'
import store from '../../../store/store'
import { actions } from '../../../store/game.action.reducer.type'

const prefix = (process.env.NODE_ENV === 'production') ? '/hitthemfrogclient' : ''

async function importModelObject (scene, imgtexture) {
  return new Promise((resolve, reject) => {
    window.THREE = THREE;
    import('three/examples/js/loaders/GLTFLoader').then(() => {
      const gltfLoader = new window.THREE.GLTFLoader()
      debugger
      const texture = THREE.ImageUtils.loadTexture(imgtexture);
      const model = prefix + '/models/frog.glb'
      gltfLoader.load(model, function (gltf) {
        let modelScene = gltf.scene
        let face = gltf.scene.children.find(e => e.name === 'body001')
        face.material.map = texture
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


export default async function (scene) {
  const frogTextr = prefix + '/models/pepe.happy.png'
  const monkeyTextr = prefix + '/models/pepe.sad.png'
  let frogs = []
  let frogObj = store.getState().frogs
  let monkey = frogObj.length ?  frogObj[0] : await importModelObject(scene, monkeyTextr)
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
      let frog = (frogObj.length < 9) ? await importModelObject(scene, frogTextr) : frogObj[count++]
      
      frog.position.set(...coordinate[i])
      scene.add(frog)
    }

    frogs.push()
  }
  
  return { 
    frogs,
  }
}