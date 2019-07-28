import store from './store/store'
import { ACTTYPE } from './store/game.action.reducer.type'
let invoked = false

export default function (socket) {
  if (!invoked) {
    invoked = true

    socket.on('listRoom', (rooms) => {
      debugger
      store.dispatch({
        type: ACTTYPE.SOCKET_UPDATE_ROOM,
        payload: { rooms }
      })
    })

    socket.on('playerScores', (playerScores) => {
      store.dispatch({
        type: ACTTYPE.SOCKET_UPDATE_PLAYER_SCORE,
        payload: { playerScores }
      })
    })

    socket.on('isGameFinished', (isGameFinished) => {
      store.dispatch({
        type: ACTTYPE.SOCKET_UPDATE_GAME_STATUS,
        payload: { isGameFinished }
      })
    })

  }
}