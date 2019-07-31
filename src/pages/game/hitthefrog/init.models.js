import store from '../../../store/store'
import { getPlayersTextureUrl } from './helpers'
import assetLoader from './assetLoader'
import { actions } from '../../../store/game.action.reducer.type'


function importModelObject (scene, texture) {
  let model = assetLoader.getModel(texture)
  store.dispatch(actions.addFrogScene(model))
  return model
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



export default function (scene) {
  const [frogTextr, monkeyTextr] = getPlayersTextureUrl()
  let frogs = []
  let frogObj = store.getState().frogs
  let monkey = frogObj.length ?  frogObj[0] : importModelObject(scene, monkeyTextr)
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
      let frog = (frogObj.length < 9) ? importModelObject(scene, frogTextr) : frogObj[count++]
      frog.position.set(...coordinate[i])
      scene.add(frog)
    }

    frogs.push()
  }
  
  return { 
    frogs,
  }
}