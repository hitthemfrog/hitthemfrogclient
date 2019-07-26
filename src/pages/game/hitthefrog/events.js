import * as THREE from 'three'
import store from '../../../store/store'
import { actions } from '../../../store/game.action.reducer.type'

export function mouseMoveListener(camera, scene) {
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()

  window.addEventListener('mousemove', onMouseMove, false)

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    let clickedObjUUidArray = intersects.map(intersect => intersect.object.uuid)
    store.dispatch(actions.setClickedIntersections(clickedObjUUidArray))
  }
  return onMouseMove
}

export function mouseClickListener(camera, scene, objectDictionary) {
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()

  window.addEventListener('mousedown', onMouseClick, false)

  function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    console.log('clicked box ' + intersects.reduce((c, e) => c + e.object.uuid + ', ', ''))
    
    // Delete on object
    if (intersects.length !== 0) {
      scene.remove(intersects[0].object)
      scene.remove(objectDictionary.frog)
    }
  }
  return onMouseClick
}
