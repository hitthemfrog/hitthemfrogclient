import React from 'react'
import { connect } from 'react-redux'
import LoadingBlock from '../../component/LoadingBlock'
import soundfile from '../../sound/sountrack_mini.mp3'
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

const imageStyle = {
    marginTop: '20px',
    width: '70%',
    // height: '100%',
    borderWidth: '4px',
    borderColor: 'white',
    // color: '#434343',
    borderStyle: 'dashed',
    borderRadius: '15px',
    // boxShadow: '1px 0px 5px rgba(16,16,66,0.75)',
    // textShadow: '1px 1px 1px rgba(105, 53, 53, 0.75)',
  
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms
  }
}

let countdownStarted = false
let isBeingFetched = false
export default connect(mapStateToProps)(
  class extends React.Component {
    state = {
      counter: 4,
      playersFound: false,
      countdownStart: false,
      assetLoaded: false,
      enemy: {},
      playerOne: {}
    }

    async checkPlayers() {
      let roomName = localStorage.getItem('htf_roomname')
      let playerName = localStorage.getItem('htf_username')
      let room = this.props.rooms.find(e => e.name === roomName)
      if (room && !this.state.playersFound && room.players.length === 2) {
        this.setState({ playersFound: true }, async () => {
          await this.loadAssets()
          let enemy = room.players.filter(e => e.name !== playerName)[0]
          let playerOne = room.players.filter(e => e.name === playerName)[0]
          this.setState({ enemy, playerOne })
        })
      }
    }

    async loadAssets() {
      let roomName = localStorage.getItem('htf_roomname')
      let playerName = localStorage.getItem('htf_username')
      let self = this
      if (!isBeingFetched) {
        const players = getPlayersTextureUrl()
        for (let i = 0; i < players.length; i++) {
          await assetLoader(players[i])
        }
        self.props.socket.emit('playerReady', { playerName, roomName })
        self.setState({ assetLoaded: true })
      }
      return true
    }

    componentDidMount() {
      let roomName = localStorage.getItem('htf_roomname')
      let playerName = localStorage.getItem('htf_username')
      this.props.socket.emit('setPlayerScore', { room: roomName, player: playerName, hit: 0, miss: 0 })
      this.checkPlayers()
      this.checkStartGame() 
    }

    checkStartGame() {
      let roomName = localStorage.getItem('htf_roomname')
      let room = this.props.rooms.find(e => e.name === roomName)
      if (this.state.assetLoaded && room && room.gameStatus === 'STARTED') {
        this.countdown()
      }
    }

    componentDidUpdate() {
      this.checkPlayers()
      this.checkStartGame()
    }

    componentWillUnmount () {
      countdownStarted = false 
      isBeingFetched = false
    }

    countdown() {
      if (countdownStarted) return
      countdownStarted = true
      let interval = setInterval(() => {
        if (this.state.counter === 0) {
          clearInterval(interval)
          this.props.history.push('/game')
          return
        }
        this.setState({
          countdownStart: true,
          counter: this.state.counter - 1
        })
      }, 1000)
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
                <>
                <div className='col s12 m4 l4'>
                {
                  this.state.playerOne.name && (
                    <div>
                      {/* {JSON.stringify(this.state)} */}
                      <h4 style={waitingStyle}>Your Frog: {this.state.playerOne.name}</h4>
                      <img style={imageStyle} alt={this.state.playerOne.name} src={`${HOST}/userimg/${this.state.playerOne.name}.png`} />
                    </div>
                  )
                }

                  <div>
                    <audio src={SoundCountdown} autoPlay />
                  </div>
                </div>

                <div className='col s12 m4 l4'>
                  {
                    this.state.counter === 0 &&
                    (
                      <div>
                        <h1 style={countdownStyle}>Go</h1>
                        
                        {/* <h4>Your Enemy: {this.state.enemy.name}</h4> */}
                        {/* <img alt={this.state.enemy.name} src={`${HOST}/userimg/${this.state.enemy.name}.png`} /> */}
                      </div>
                    )
                  }
                  {
                    this.state.counter > 0 &&
                    (
                      <div>
                        <h1 style={countdownStyle}>{this.state.counter}</h1>
                        {/* <h3 style={countdownStyle}>vs</h3> */}
                        {/* <h4>Your Enemy: {this.state.enemy.name}</h4>
                        <img alt={this.state.enemy.name} src={`${HOST}/userimg/${this.state.enemy.name}.png`} /> */}
                      </div>
                    )
                  }
                </div>

                <div className='col s12 m4 l4'>
                {
                    this.state.enemy.name &&
                    (
                      <div>
                        <h4 style={waitingStyle}>Your Enemy: {this.state.enemy.name}</h4>
                        <img style={imageStyle} alt={this.state.enemy.name} src={`${HOST}/userimg/${this.state.enemy.name}.png`} />
                      </div>
                    )
                  }

                </div>

                </>
              }
              {
                !this.state.countdownStart &&
                <>
                <div className='col s12 m4 l4'>
                {
                  this.state.playerOne.name && (
                    <div>
                      {/* {JSON.stringify(this.state)} */}
                      <span style={waitingStyle}>Loading Assets</span>
                      <h4 style={waitingStyle}>Your Enemy: {this.state.playerOne.name}</h4>
                      <img style={imageStyle} alt={this.state.playerOne.name} src={`${HOST}/userimg/${this.state.playerOne.name}.png`} />
                    </div>
                  )
                }
                </div>
                <div className='col s12 m4 l4'>
                  
                  <LoadingBlock />
                  <span style={waitingStyle}>Waiting another player...</span>
                </div>
                <div className='col s12 m4 l4'>
                  {
                    this.state.enemy.name && (
                      <div>
                        {/* {JSON.stringify(this.state)} */}
                        <span style={waitingStyle}>Loading Assets</span>
                        <h4 style={waitingStyle}>Your Enemy: {this.state.enemy.name}</h4>
                        <img style={imageStyle} alt={this.state.enemy.name} src={`${HOST}/userimg/${this.state.enemy.name}.png`} />
                      </div>
                    )
                  }
                </div>
                </>
              }
            </div>
          </div>
        </>
      )
    }
  })

