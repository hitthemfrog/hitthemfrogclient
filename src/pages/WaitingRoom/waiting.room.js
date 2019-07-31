import React from 'react'
import { connect } from 'react-redux'
import LoadingBlock from '../../component/LoadingBlock'
import soundfile from '../../sound/sountrack.mp3'
import SoundCountdown from '../../sound/Game-start-countdown.mp3'
import assetLoader from '../game/hitthefrog/assetLoader'
import { getPlayersTextureUrl } from '../game/hitthefrog/helpers'
import HOST from '../../host'

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
      playersFound: false,
      countdownStart: false,
      assetLoaded: false,
      enemy: {}
    }

    async checkPlayers() {
      let roomName = localStorage.getItem('htf_roomname')
      let playerName = localStorage.getItem('htf_username')
      let room = this.props.rooms.find(e => e.name === roomName)
      if (room && !this.state.playersFound && room.players.length === 2) {
        this.setState({playersFound: true}, async () => {
          this.loadAssets().fetch()
          let enemy = room.players.filter(e => e.name !== playerName)[0]
          this.setState({enemy})
        })
      }
    }

    loadAssets() {
      let roomName = localStorage.getItem('htf_roomname')
      let playerName = localStorage.getItem('htf_username')
      let self = this
      let isBeingFetched = false 
      return {
        fetch: async function () {
          if (isBeingFetched) return

          const players = getPlayersTextureUrl()
          for (let i = 0; i < players.length; i++) {
            await assetLoader(players[i])
          }
          self.props.socket.emit('playerReady', { playerName, roomName }) 
          self.setState({ assetLoaded: true })
        }
      }
    }

    componentDidMount() {
      this.loadAssets()
      let roomName = localStorage.getItem('htf_roomname')
      let playerName = localStorage.getItem('htf_username')
      this.props.socket.emit('setPlayerScore', { room: roomName, player: playerName, hit: 0, miss: 0 })
      this.checkPlayers()
      
    }

    checkStartGame () {
      let roomName = localStorage.getItem('htf_roomname')
      let room = this.props.rooms.find(e => e.name === roomName)
      if (this.state.assetLoaded && room && room.gameStatus === 'STARTED') {
        this.countdown().start()
      }
    }

    componentDidUpdate() {
      this.checkPlayers()
      this.checkStartGame()
    }


    countdown() {
      let isStarted = false
      let self = this
      return {
        start() {
          if (isStarted) return
          isStarted = true
          let interval = setInterval(() => {
            if (self.state.counter === 0) {
              clearInterval(interval)
              console.log('ke room mas')
              self.props.history.push('/game')
              return
            }
            self.setState({
              countdownStart: true,
              counter: self.state.counter - 1
            })
          }, 1000)
        }
      }
    }


    render() {
      return (
        <>
          <div>
            <audio src={soundfile} autoPlay />
          </div>
          <div id="style-15" className="roomBox scrollbar force-overflow">
            <div className='row'>
              {
                this.state.countdownStart &&
                <div className='col s12 m12 l12'>
                  <div>
                    <audio src={SoundCountdown} autoPlay />
                  </div>
                  {
                    this.state.counter === 0 &&
                    (
                      <div>
                        <h1 style={countdownStyle}>Go</h1>
                        <h4>Your Enemy: {this.state.enemy.name}</h4>
                        <img alt={this.state.enemy.name} src={`${HOST}/userimg/${this.state.enemy.name}.png`} />
                      </div>
                    )
                  }
                  {
                    this.state.counter > 0 && 
                    (
                      <div>
                        <h1 style={countdownStyle}>{this.state.counter}</h1>
                        <h4>Your Enemy: {this.state.enemy.name}</h4>
                        <img alt={this.state.enemy.name} src={`${HOST}/userimg/${this.state.enemy.name}.png`} />
                      </div>
                    )
                  }
                </div>
              }
              {
                !this.state.countdownStart &&
                <div className='col s12 m12 l12'>
                  <LoadingBlock />
                  {
                    this.state.enemy.name ? (
                      <div>
                        <span style={waitingStyle}>Loading Assets</span>
                        <h4>Your Enemy: {this.state.enemy.name}</h4>
                        <img alt={this.state.enemy.name} src={`${HOST}/userimg/${this.state.enemy.name}.png`} />
                      </div>
                      ) : (
                        <span style={waitingStyle}>Waiting another player...</span>
                    )
                  }
                </div>
              }
            </div>
          </div>
        </>
      )
    }
  })

