import * as THREE from 'three'
const prefix = (process.env.NODE_ENV === 'production') ? '/hitthemfrogclient' : ''

let modelDictionary = {}
async function loadModels (imgtexture) {
  return new Promise((resolve, reject) => {
    window.THREE = THREE;
    import('three/examples/js/loaders/GLTFLoader').then(() => {
      const gltfLoader = new window.THREE.GLTFLoader()
      const textureLoader = new THREE.TextureLoader()
      const model = prefix + '/models/frog.glb'
      textureLoader.setCrossOrigin = 'anonymous'
      const texture = textureLoader.load(imgtexture);
      gltfLoader.load(model, function (gltf) {
        let modelScene = gltf.scene
        let face = gltf.scene.children.find(e => e.name === 'body001')
        face.material.map = texture
        modelDictionary[imgtexture] = modelScene
        resolve()
      }, undefined, function (error) {
        console.error(error)
        reject(error)
      })
    })
  })
}
loadModels.getModel = function (imgtexture) {
  let scene = modelDictionary[imgtexture].clone()
  scene.traverse(function (object) {
    if (object.isMesh) {
      object.material = object.material.clone();
    }
  })
  return scene
}

export default loadModels