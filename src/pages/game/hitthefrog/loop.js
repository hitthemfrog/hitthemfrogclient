import store from '../../../store/store'
import { actions } from '../../../store/game.action.reducer.type'
import { paintObjectOnIntersect, removeAllObjects, getSpeedLevel } from './helpers'
import initModels from './init.models'

export default function (scene, renderer, camera, sceneHud, cameraHud, setScoreHud, socket, history) {
   
  // function onWindowResize() {
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // }

  // window.addEventListener('resize', onWindowResize, false)
  
  let frogLegAnimationForward = true
  let timer = 0
  let number =6
  let isGameOver = false
  
  let speedLevel = getSpeedLevel()
  let yDirection = 0.065

  function loop (currentTime) {
    let state = store.getState()
    let { intersects, frogs, playerScores, isGameFinished } = state
    const delta = currentTime - timer

    if (isGameFinished.winner) {
      history.push('/gameOver')
      isGameOver = true
      return
    }

    
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
      })
    })

    setScoreHud(playerScores[0], playerScores[1], number)

    if (delta >= speedLevel) {
      store.dispatch(actions.setClickedIntersections([]))
      number -=1
      removeAllObjects(scene)
      initModels(scene) 
      
      if (!store.getState().isClicked && timer !== 0) store.dispatch(actions.addMiss())

      timer = currentTime
      store.dispatch(actions.setClicked(false))

      const roomName = localStorage.getItem('htf_roomname')
      const playerName = localStorage.getItem('htf_username')
      socket.emit('setPlayerScore', { room: roomName, player: playerName, hit: state.hitScore, miss: state.missScore })

      yDirection = -yDirection
    }

    if (!isGameOver) {
      requestAnimationFrame(loop);
    }

    if (frogs) frogs.forEach(f => {
      f.rotation.y += yDirection
    })

    paintObjectOnIntersect(scene, intersects)

    renderer.render(scene, camera);
    renderer.render(sceneHud, cameraHud)
  }

  loop()
};



