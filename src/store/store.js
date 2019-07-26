import { createStore } from 'redux'
import { reducer } from './game.action.reducer.type'

const store = createStore(reducer)

export default store