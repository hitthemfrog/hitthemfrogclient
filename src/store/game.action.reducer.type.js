export const ACTTYPE = {
  SET_ONCLICK_INTERSECTIONS: 'H(*#YH*#EHD&#W*YD(*H#(&G#UIGW'
}

const defaultState = {
  clickedObjUUidArray: []
}

export function reducer (state = defaultState, action) {
  switch (action.type) {
    case ACTTYPE.SET_ONCLICK_INTERSECTIONS:
      state.clickedObjUUidArray = action.payload.intersections
      return state;
  
    default:
      return state;
  }
}

export const actions = {
  setClickedIntersections(intersections) {
    return {
      type: ACTTYPE.SET_ONCLICK_INTERSECTIONS,
      payload: {intersections}
    }
  }
}