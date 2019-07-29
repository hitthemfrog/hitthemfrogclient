import React from 'react'
import Loading from '../../component/Loading'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    rooms: state.rooms
  }
}
export default connect(mapStateToProps)(
  class extends React.Component {
    checkPlayers() {
      let roomname = localStorage.getItem('htf_roomname')
      let room = this.props.rooms.find(e => e.name === roomname)
      if (room && room.players.length === 2) {
        this.props.history.push('/game')
      }
    }
    
    componentDidMount() {
      let roomName = localStorage.getItem('htf_roomname')
      let playerName = localStorage.getItem('htf_username')
      this.props.socket.emit('setPlayerScore', { room: roomName, player: playerName, hit: 0, miss: 0 })
      this.checkPlayers()
    }

    componentDidUpdate() {
      this.checkPlayers()  
    }

    render () {
      return <Loading/>
    }
  }
)