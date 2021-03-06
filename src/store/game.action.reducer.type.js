export const ACTTYPE = {
  SET_ONCLICK_INTERSECTIONS: 'SET_ONCLICK_INTERSECTIONS',
  ADD_GROUP_SCENE_FROG_UUID: 'ADD_GROUP_SCENE_FROG_UUID',
  REMOVE_GROUP_SCENE_FROG_UUID: 'REMOVE_GROUP_SCENE_FROG_UUID',
  ADD_HIT_SCORE: 'ADD_HIT_SCORE',
  ADD_MISS_SCORE: 'ADD_MISS_SCORE',
  IS_CLICKED: 'IS_CLICKED',
  CLEAR_GAME: 'CLEAR_GAME',

  SOCKET_UPDATE_ROOM: 'SOCKET_UPDATE_ROOM',
  SOCKET_UPDATE_PLAYER_SCORE: 'SOCKET_UPDATE_PLAYER_SCORE',
  SOCKET_UPDATE_GAME_STATUS: 'SOCKET_UPDATE_GAME_STATUS'
}

const defaultState = {
  intersects: [],
  frogs: [],
  hitScore: 0,
  missScore: 0,
  isClicked: false,
  rooms: [], 
  isGameFinished: {},
  playerScores: []
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
    case ACTTYPE.ADD_HIT_SCORE: {
      state.hitScore += 1
      return state
    }
    case ACTTYPE.ADD_MISS_SCORE: {
      state.missScore += 1
      return state
    }
    case ACTTYPE.IS_CLICKED: {
      state.isClicked = action.payload
      return state
    }

    case ACTTYPE.SOCKET_UPDATE_ROOM: {
      state.rooms = action.payload.rooms
      return {...state}
    }
    case ACTTYPE.SOCKET_UPDATE_PLAYER_SCORE: {
      state.playerScores = action.payload.playerScores
      return {...state}
    }
    case ACTTYPE.SOCKET_UPDATE_GAME_STATUS: {
      state.isGameFinished = action.payload.isGameFinished
      return {...state}
    }
    case ACTTYPE.CLEAR_GAME: {
      state.isGameFinished = {}
      state.playerScores = []
      state.hitScore = 0
      state.missScore = 0
      state.frogs = []
      return {...state}
    }

    default:
      return state
  }
}

export const actions = {
  clearGame() {
    return {
      type: ACTTYPE.CLEAR_GAME
    }
  },
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
      type: ACTTYPE.ADD_HIT_SCORE
    }
  },
  addMiss () {
    return {
      type: ACTTYPE.ADD_MISS_SCORE
    }
  },
  setClicked (status) {
    return {
      type: ACTTYPE.IS_CLICKED,
      payload: status
    }
  } 

}