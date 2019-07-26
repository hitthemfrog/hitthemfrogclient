import * as THREE from 'three'

function importFrog (scene) {
  window.THREE = THREE;
  let FROG_SCENE
  import('three/examples/js/loaders/GLTFLoader').then(() => {
    // Note : window. is required here to make it works.
    const gltfLoader = new window.THREE.GLTFLoader();
    // Have fun here
    gltfLoader.load('./models/simple.frog.glb', function (gltf) {
      FROG_SCENE = gltf.scene
      scene.add(FROG_SCENE)
      return FROG_SCENE
    }, undefined, function (error) {
      console.error(error)
    })
  })
}

export default function (scene) {
  let cubes = []
  for (let i = 0; i < 3; i++) {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);
    cube.translateX(2 * i)
    cube.translateY(1 * i)
    cubes.push(cube)
  }

  let frog = importFrog(scene)
  cubes.forEach(cube => scene.add(cube))
  return { 
    cubes,
    frog,
  }
}