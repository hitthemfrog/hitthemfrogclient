import * as THREE from 'three'
import store from '../../../store/store'
import { actions } from '../../../store/game.action.reducer.type'
import incorrectSound from '../../../sound/incorrect.mp3'


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
      

      if (intersects[0].object.parent.name === 'monkeyObjectScene') store.dispatch(actions.addHit())
      else store.dispatch(actions.addMiss())

      store.dispatch(actions.setClicked(true))
      debugger
      socket.emit('setPlayerScore', { room: roomName, player: playerName, hit: state.hitScore, miss: state.missScore })
    }
  }
  return onMouseClick
}
