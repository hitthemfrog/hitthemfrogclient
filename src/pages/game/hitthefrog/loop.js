import store from '../../../store/store'

export default function (scene, renderer, camera, objectDictionary) {
  
  function loop () {
    let state = store.getState()
    let { clickedObjUUidArray } = state

    requestAnimationFrame(loop);
    let { cubes, FROG_SCENE } = objectDictionary
    cubes.forEach(cube => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      if (FROG_SCENE) FROG_SCENE.rotation.x += 0.01
      if (clickedObjUUidArray.includes(cube.uuid)) {
        cube.material.color.set(0xff0000)
      } else {
        cube.material.color.set(0x00ff00)
      }
    })
    renderer.render(scene, camera);
  }

  loop()
};
