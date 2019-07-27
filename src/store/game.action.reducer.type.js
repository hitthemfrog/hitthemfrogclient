export const ACTTYPE = {
  SET_ONCLICK_INTERSECTIONS: 'SET_ONCLICK_INTERSECTIONS',
  ADD_GROUP_SCENE_FROG_UUID: 'ADD_GROUP_SCENE_FROG_UUID',
  REMOVE_GROUP_SCENE_FROG_UUID: 'REMOVE_GROUP_SCENE_FROG_UUID',
  ADD_HIT: 'ADD_HIT',
  ADD_MISS: 'ADD_MISS'
}

const defaultState = {
  intersects: [],
  frogs: [],
  hitPoints: 0,
  missPoints: 0
}

export function reducer (state = defaultState, action) {
  switch (action.type) {
    case ACTTYPE.SET_ONCLICK_INTERSECTIONS: {
      state.intersects = action.payload.intersections
      return state
    }
    case ACTTYPE.ADD_GROUP_SCENE_FROG_UUID: {
      state.frogs = [...state.frogs, action.payload.frogScene]
      return state
    }
    case ACTTYPE.REMOVE_GROUP_SCENE_FROG_UUID: {
      let { frogs } = state
      let { sceneuuid } = action.payload 
      let index = frogs.findIndex(e => e === sceneuuid)
      if (index !== -1) {
        frogs = frogs.splice(index, 1)
        state.frogs =  [...frogs]
        return state
      } else {
        return state
      }
    }
    case ACTTYPE.ADD_HIT: {
      state.hitPoints += 1
      return state
    }
    case ACTTYPE.ADD_MISS: {
      state.missPoints += 1
      return state
    }
    default:
      return state
  }
}

export const actions = {
  setClickedIntersections(intersections) {
    return {
      type: ACTTYPE.SET_ONCLICK_INTERSECTIONS,
      payload: { intersections }
    }
  },
  addFrogScene (frogScene) {
    return {
      type: ACTTYPE.ADD_GROUP_SCENE_FROG_UUID,
      payload: { frogScene } 
    }
  },
  removeFrogScene (sceneuuid) {
    return {
      type: ACTTYPE.REMOVE_GROUP_SCENE_FROG_UUID, 
      payload: {sceneuuid}
    }
  },
  addHit () { 
    return {
      type: ACTTYPE.ADD_HIT
    }
  },
  addMiss () {
    return {
      type: ACTTYPE.ADD_MISS
    }
  } 

}