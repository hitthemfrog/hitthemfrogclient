import store from '../../../store/store'
import { paintObjectOnIntersect } from './helpers'

export default function (scene, renderer, camera, sceneHud, cameraHud, setScoreHud) {
   
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize, false)
  
  function loop () {
    let state = store.getState()
    let { intersects, frogs } = state

    let katakkatak = scene.children.filter(e => e.name === 'Scene')
    let kakikaki = katakkatak[1].children.filter(e => e.name !== 'body')
    if (kakikaki) {
      kakikaki[0].rotation.x += 0.1
    }

    setScoreHud('test HUD ' + Math.random())

    requestAnimationFrame(loop);
    if (frogs) frogs.forEach(f => {
      f.rotation.y += 0.065
    })

    paintObjectOnIntersect(scene, intersects)

    renderer.render(scene, camera);
    renderer.render(sceneHud, cameraHud)
  }

  loop()
};



