
import * as THREE from "three";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

let cubes = [] 
for (let i = 0; i < 3; i++) {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  let cube = new THREE.Mesh(geometry, material);
  cube.translateX(2 * i)
  cube.translateY(1 * i)
  cubes.push(cube)
}

cubes.forEach(cube => scene.add(cube))
camera.position.z = 5;

let intersectsObjUUID = []

export function mouseMoveListener (containerWidth, containerHeight) {
  let raycaster = new THREE.Raycaster(); // create once
  let mouse = new THREE.Vector2(); // create once

  window.addEventListener('mousemove', onMouseMove, false)

  function onMouseMove (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    intersectsObjUUID = intersects.map(intersect => intersect.object.uuid)
  }
}

export function mouseClickListener () {
  let raycaster = new THREE.Raycaster(); // create once
  let mouse = new THREE.Vector2(); // create once

  window.addEventListener('mousedown', onMouseMove, false)

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    alert('clicked box '+ intersects.reduce((c,e) => c + e.object.uuid + ', ',''))
  }
}

export function onUnmount () {
  
}

export function mount (el) {
  el.appendChild(renderer.domElement);
}

export function animate () {
  requestAnimationFrame(animate);
  cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    if (intersectsObjUUID.includes(cube.uuid)) {
      cube.material.color.set(0xff0000)
    } else {
      cube.material.color.set(0x00ff00)
    }
  })
  renderer.render(scene, camera);
};

