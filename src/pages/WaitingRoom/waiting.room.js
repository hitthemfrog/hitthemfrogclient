import React from 'react'
import Loading from '../../component/Loading'
import { connect } from 'react-redux'
import Loading2 from '../../component/Loading2'
import LoadingBlock from '../../component/LoadingBlock'
import soundfile from '../../sound/sountrack.mp3'
import SoundCountdown from '../../sound/Game-start-countdown.mp3'

const countdownStyle = {
  fontFamily: 'Saira Stencil One, cursive',
  fontSize: '208px'
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
      counter: 4,
      countdownStart : false
    }
    
    checkPlayers() {
      let roomname = localStorage.getItem('htf_roomname')
      let room = this.props.rooms.find(e => e.name === roomname)
      if (room && room.players.length === 2) {
        if (this.state.counter === 4){
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
    let interval = setInterval(() => {
      if(this.state.counter === 0){
          clearInterval(interval)
          console.log('ke room mas')
          this.props.history.push('/game')
          return 
      } 
      this.setState({
        countdownStart: true,
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
                  {
                    this.state.countdownStart &&
                    <div className='col s12 m12 l12'>
                      <div>
                        <audio src={SoundCountdown} autoPlay/>
                      </div>
                      {
                        this.state.counter === 0 &&
                        <h1 style={countdownStyle}>Go</h1>
                      }
                      {
                        this.state.counter > 0 &&
                        <h1 style={countdownStyle}>{this.state.counter}</h1>
                      }
                    </div>
                  }
                  {
                    !this.state.countdownStart &&
                    <div className='col s12 m12 l12'>
                      <LoadingBlock />
                      <span style={waitingStyle}>Waiting another player...</span>
                    </div>
                  }
              </div>      
            </div>
      </>
    )
  }
})

