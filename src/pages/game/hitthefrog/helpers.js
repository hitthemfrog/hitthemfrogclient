// import store from '../../../store/store'

export function removeObjectOnIntersect(scene, intersects) {
  intersects.forEach(intersect => {
    let hasParent = intersect.object.parent
    let isRootParent = hasParent && !hasParent.parent
    if (hasParent && !isRootParent) {
      let parentuuid = hasParent.uuid
      let group = scene.children.find(e => e.uuid === parentuuid)
      let children_to_remove = [];
      group.children.forEach(m => children_to_remove.push(m))
      children_to_remove.forEach(function (child) {
        group.remove(child);
      })
      scene.remove(group)
    } else {
      scene.remove(intersect.object)
    }
  })
}

export function defaultPaint() {
  
}

export function paintObjectOnIntersect(scene, intersects) {
  intersects.forEach(intersect => {
    let hasParent = intersect.object.parent
    let isRootParent = hasParent && !hasParent.parent
    if (hasParent && !isRootParent) {
      let parentuuid = hasParent.uuid
      let group = scene.children.find(e => e.uuid === parentuuid)
      group.children.forEach(m => {
        m.material.color.set(0xff0000)
      })
    } else {
      intersect.object.material.color.set(0xff0000)
    }
  })
}

export function removeAllObjects(scene, intersect) {
  let scenes = scene.children.filter(scn => scn.type !== 'HemisphereLight')
  if (intersect.length !== 0) scenes.forEach(scn => scene.remove(scn))
}

// export function randomFromState(scene) {
//   let index = Math.round(Math.random() * 8)
//   let sceneObj = store.getState().frogs
//   let count = 1

//   for (let i = 0; i < sceneObj.length; i++) {
//     if (i === index) scene.add(sceneObj[0])
//     else {
//       scene.add(sceneObj[count])
//       count++;
//     }
//   }
// }