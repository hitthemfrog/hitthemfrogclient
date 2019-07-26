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