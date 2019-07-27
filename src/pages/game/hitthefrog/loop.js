import store from '../../../store/store'
import { paintObjectOnIntersect } from './helpers'

export default function (scene, renderer, camera, sceneHud, cameraHud, setScoreHud) {
   
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize, false)
  

  let frogLegAnimationForward = true
  function loop () {
    let state = store.getState()
    let { intersects, frogs } = state

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



