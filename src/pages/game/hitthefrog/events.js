import * as THREE from 'three'

export function mouseMoveListener(camera, scene, clickedObjUUidArray) {
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()

  window.addEventListener('mousemove', onMouseMove, false)

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    clickedObjUUidArray = intersects.map(intersect => intersect.object.uuid)
  }
  return onMouseMove
}

export function mouseClickListener(camera, scene) {
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()

  window.addEventListener('mousedown', onMouseClick, false)

  function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    console.log('clicked box ' + intersects.reduce((c, e) => c + e.object.uuid + ', ', ''))
  }
  return onMouseClick
}