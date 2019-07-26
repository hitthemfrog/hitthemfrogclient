import store from '../../../store/store'
import { paintObjectOnIntersect } from './helpers'

export default function (scene, renderer, camera, objectDictionary) {
  
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize, false)
  
  function loop () {
    let state = store.getState()
    let { intersects, frogs } = state


    requestAnimationFrame(loop);
    if (frogs) frogs.forEach(f => {
      f.rotation.y += 0.065
    })
    paintObjectOnIntersect(scene, intersects)
    renderer.render(scene, camera);
  }

  loop()
};
