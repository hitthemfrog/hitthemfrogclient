import React from 'react'
import Loading from '../../component/Loading'

let listRoomListener = null

export default class extends React.Component {
  componentDidMount() {
    listRoomListener = this.props.socket.on('listRoom', (rooms) => {
      let roomName = localStorage.getItem('htf_roomname')
      let room = rooms.find(e => e.name === roomName)
      if (room.players.length === 2) {
        this.props.history.push('/game')
      }
    })

    this.props.socket.emit('checkRoom')
  }

  componentWillUnmount() {
    this.props.socket.removeListener('listRoom', listRoomListener)
  }

  render () {
    return <Loading/>
  }
}