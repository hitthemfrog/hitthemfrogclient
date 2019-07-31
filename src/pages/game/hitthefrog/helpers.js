import store from '../../../store/store'

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
  if (intersects.length === 0) scene.children.forEach(obj => {
    if (obj.type === 'Scene') obj.children.forEach(objChild => objChild.material.color.set(0xffffff))
  })

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
      intersect.object.material.color.set(0xffffff)
    }
  })
}

export function removeAllObjects(scene) {
  let scenes = scene.children.filter(scn => scn.type !== 'HemisphereLight')
  scenes.forEach(scn => scene.remove(scn))
}

export function getSpeedLevel() {
  let index = store.getState().rooms.findIndex(room => room.name === localStorage.getItem('htf_roomname'))
  let speedLevel =  store.getState().rooms[index].gameLevel

  switch (speedLevel) {
    case 'EASY': speedLevel = 5000; break;
    case 'NORMAL': speedLevel = 3000; break;
    case 'HARD': speedLevel = 1500; break;

    // default: speedLevel = 3000
  }

  return speedLevel
}
