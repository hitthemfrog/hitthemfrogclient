import store from '../../../store/store'
import { actions } from '../../../store/game.action.reducer.type'
import { paintObjectOnIntersect, removeAllObjects } from './helpers'
import initModels from './init.models'


export default function (scene, renderer, camera, sceneHud, cameraHud, setScoreHud, socket) {
   
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize, false)
  
  let frogLegAnimationForward = true
  const state = store.getState()
  let timer = 0
  let number = 6

  function loop (currentTime) {
    let state = store.getState()
    let { intersects, frogs } = state
    const delta = currentTime - timer

    if (!store.getState().isClicked) {
      let katakkatak = scene.children.filter(e => e.name === 'Scene')
    katakkatak.forEach(kakinya => {
      let kakikaki = kakinya.children.filter(e => e.name !== 'body')
      kakikaki.forEach(el => {
        if (el.rotation.x >= 0.25) {
          frogLegAnimationForward = false
        }
        if (el.rotation.x <= -0.25) {
          frogLegAnimationForward = true
        }
        el.rotation.x += 0.02 * ((frogLegAnimationForward) ? 1 : -1)
        // console.log(el.rotation.x)
        // if (el.scale.x === 0.34881994128227234) {
        //     if (el.rotation.x >= 0.3) {
        //       el.rotation.x -= 0.3
        //     }
        // }
        // console.log(el)
        // el.rotation.x += 0.3
        // el.rotation.y -= 0.3
        // el.rotation.z -= 0.3
      })
      // debugger
    })
    }

    

    setScoreHud(`Hit: ${store.getState().hitScore} Miss: ${store.getState().missScore} 
    Count Down: ${number}`)

    if (delta >= 3000 ) {
      timer = currentTime
      number -=1
      removeAllObjects(scene)
      initModels(scene) 
      
      if (!store.getState().isClicked) store.dispatch(actions.addMiss())
      store.dispatch(actions.setClicked(false))

      const roomName = localStorage.getItem('roomName')
      const playerName = localStorage.getItem('player')
      socket.emit('setPlayerScore', { room: roomName, player: playerName, hit: state.hitScore, miss: state.missScore })
    }

    requestAnimationFrame(loop);
    if (frogs && !store.getState().isClicked) frogs.forEach(f => {
      f.rotation.y += 0.065
    })

    paintObjectOnIntersect(scene, intersects)

    renderer.render(scene, camera);
    renderer.render(sceneHud, cameraHud)
  }

  loop()
};



