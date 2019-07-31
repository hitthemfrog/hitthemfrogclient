import store from '../../../store/store'
import HOST from '../../../host'

export function getPlayersTextureUrl() {
  let currentPlayer = localStorage.getItem('htf_username')
  let currentRoom = localStorage.getItem('htf_roomname')
  let { rooms } = store.getState()
  let room = rooms.find(e => e.name === currentRoom)
  let otherPlayers = room.players.filter(e => e.name !== currentPlayer)
  let otherPlayerName = otherPlayers[0] && otherPlayers[0].name
  let player1Url = `${HOST}/userimg/${currentPlayer}.png`
  let player2Url = `${HOST}/userimg/${otherPlayerName}.png`
  return [player1Url, player2Url]
}

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
