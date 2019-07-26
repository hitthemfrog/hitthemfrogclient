import store from '../../../store/store'
import { paintObjectOnIntersect } from './helpers'

export default function (scene, renderer, camera, objectDictionary) {
  
  function loop () {
    let state = store.getState()
    let { intersects, frogs } = state


    requestAnimationFrame(loop);
    let { cubes } = objectDictionary
    cubes.forEach(cube => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      if (frogs) frogs.forEach(f => f.rotation.x += 0.01)
      paintObjectOnIntersect(scene, intersects)
    })
    renderer.render(scene, camera);
  }

  loop()
};
