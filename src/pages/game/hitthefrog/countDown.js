import * as THREE from 'three'

export default  (scene, number) => {
  let loader = new THREE.FontLoader()

  loader.load('fonts/optimer_regular.typeface.json', function(font) {
    var countDownGeometry = new THREE.TextGeometry(String(number), {
      font: font,
      size: .01,
      height: 5,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: .3,
      bevelOffset: 0,
      bevelSegments: 10
    })

    let countDownMaterial = new THREE.MeshLambertMaterial({color: 0xff3300})
    let countDownText = new THREE.Mesh(countDownGeometry, countDownMaterial)
    countDownText.name = 'countDownText'
    scene.add(countDownText)
  })
}