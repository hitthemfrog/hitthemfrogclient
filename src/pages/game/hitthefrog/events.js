import * as THREE from 'three'
import store from '../../../store/store'
import { actions } from '../../../store/game.action.reducer.type'
import incorrectSound from '../../../sound/frogsoundeffect.mp3'
import coinSound from '../../../sound/mario-coin-sound.mp3'
import { removeObjectOnIntersect } from './helpers'


export function mouseMoveListener(camera, scene) {
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()

  window.addEventListener('mousemove', onMouseMove, false)

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true)
    store.dispatch(actions.setClickedIntersections(intersects))
  }
  return onMouseMove
}

export function mouseClickListener(camera, scene, socket, objectDictionary) {
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()

  window.addEventListener('mousedown', onMouseClick, false)

  function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length !== 0 && !store.getState().isClicked) {
      const roomName = localStorage.getItem('htf_roomname')
      const playerName = localStorage.getItem('htf_username')
      const state = store.getState()
      let audioFalse = new Audio();
      audioFalse.src = incorrectSound
      let audioTrue = new Audio();
      audioTrue.src = coinSound

      if (intersects[0].object.parent.name === 'monkeyObjectScene') {
        store.dispatch(actions.addHit())
        audioTrue.play();
      } else {
        store.dispatch(actions.addMiss())
        audioFalse.play();

      }

      if (!store.getState().isClicked) intersects.forEach(intersect => scene.remove(intersect.object.parent))

      store.dispatch(actions.setClicked(true))
      socket.emit('setPlayerScore', { room: roomName, player: playerName, hit: state.hitScore, miss: state.missScore })
    }
  }
  return onMouseClick
}

// export function windowResizeListener(camera, renderer)
