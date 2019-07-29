import React from 'react'
import Loading from '../../component/Loading'
import { connect } from 'react-redux'

import Loading2 from '../../component/Loading2'
import LoadingBlock from '../../component/LoadingBlock'
import soundfile from '../../sound/sountrack.mp3'


const waitingStyle2 = {
  fontFamily: 'Special Elite, cursive',
  fontSize: '28px'
}

const waitingStyle = {
  // fontFamily: 'Special Elite, cursive',
  fontFamily: 'Snowburst One, cursive',
  fontSize: '28px'
}


const mapStateToProps = state => {
  return {
    rooms: state.rooms
  }
}

export default connect(mapStateToProps)(
  class extends React.Component {
    state = {
      counter: 5
    }
    
    checkPlayers() {
      let roomname = localStorage.getItem('htf_roomname')
      let room = this.props.rooms.find(e => e.name === roomname)
      if (room && room.players.length === 2) {
        if (this.state.counter === 5){
          this.countdown()
        }
      }
    }
    
    componentDidMount() {
      let roomName = localStorage.getItem('htf_roomname')
      let playerName = localStorage.getItem('htf_username')
      this.props.socket.emit('setPlayerScore', { room: roomName, player: playerName, hit: 0, miss: 0 })
      this.checkPlayers()
    }
    
    componentDidUpdate() {
      let roomName = localStorage.getItem('htf_roomname')
      this.checkPlayers()  
      
    }

  
  countdown() {
    setInterval(() => {
      if(this.state.counter === 0){
          clearInterval()
          this.props.history.push('/game')
          return 
      } 
      this.setState({
        counter: this.state.counter - 1
      })
    }, 1000)
  }

  
  render () {
    return (
      <>
        <div>
            <audio src={soundfile} autoPlay/>
        </div>
        <div id="style-15" className="roomBox scrollbar force-overflow">
              <div className='row'>
                <div className='col s12 m12 l12'>
                  {
                    <h1>{this.state.counter}</h1>
                  }
                  {/* {JSON.stringify(this.props)} */}
                  {/* <Loading/> */}
                  {/* <span style={waitingStyle2}>Waiting another player...</span> */}
                  {/* {JSON.stringify(this.props)} */}
                </div>
                <div className='col s12 m12 l12'>
                  {/* <Loading2/>
                   */}
                   <LoadingBlock />
                  <span style={waitingStyle}>Waiting another player...</span>
                </div>
              </div>      
            </div>
      </>
    )
  }
})

