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