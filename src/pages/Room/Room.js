import React, { Component } from 'react'
import IconUser from '../../image/frog-transparent-pixel-art-1.gif'
import RoomCard from './RoomCard'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import soundfile from '../../sound/sountrack_mini.mp3'
import frogSound from '../../sound/frogsoundeffect.mp3'

export class Room extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      avail_rooms: [],
      inputRoomName: '',
      selectGameType: 'CLASSIC',
      selectGameLevel: 'NORMAL',
      playerName: localStorage.getItem('htf_username'),
      statusUserName: localStorage.getItem('htf_username'),
      statusCreateRoom: false
    })
  }


  userLogout() {
    localStorage.removeItem('htf_username')
    this.setState({
      statusUserName: false,
      playerName: '',
    })
  }

  launch_toast() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 4000);
  }

  onChange = (e) => this.setState({
    [e.target.name]: e.target.value
  })

  cobaBikinRoom = (e) => {
    e.preventDefault();
    let audioButton = new Audio();
    audioButton.src = frogSound
    audioButton.play()
    let roomName = this.state.inputRoomName
    let gameType = this.state.selectGameType
    let gameLevel = this.state.selectGameLevel

    localStorage.setItem('htf_roomname', roomName)
    if (this.state.inputRoomName !== '') {
      let self = this
      this.props.socket.emit('joinRoom', { roomName, playerName: localStorage.getItem('htf_username'), gameType, gameLevel }, function (val) {
        if (val) {
          self.props.history.push('/waitingRoom')
        } else {
          /**
           * handle untuk error
           */
        }
      })
    } else {
      var x = document.getElementById("toast")
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
    }
  }

  // onChangeGameType = (e) => this.setState({ [e.target.name]: e.target.value })

  // onChangeGameLevel = (e) => this.setState({ [e.target.name]: e.target.value })

  componentDidMount() {
    this.props.socket.emit('checkRoom')
  }

  render() {
    return (
      <>
        {
            <div>
                <audio src={soundfile} autoPlay loop/>
                <button onClick={() => this.userLogout()} className=" red darken-3 waves-effect waves-light btn large right"><i className="material-icons right">exit_to_app</i>Exit</button>
            </div>
        }
        {
          this.state.statusUserName
          &&
          <>
            <div className="force-overflow">
            </div>
            <div id="style-15" className="roomBox scrollbar force-overflow">
              <div className='row'>
                <div className='col s12 m4 l4'>
                  <img src={IconUser} alt="logo" />
                </div>
                <div className='col s12 m4 l4'>
                  <span className='playerNameStyle'>Welcome, {this.state.playerName}</span>
                </div>
                <div className='col s12 m4 l4'>
                  <form onSubmit={this.cobaBikinRoom}>
                    <select style={styleSelect} name="selectGameType" value={this.state.selectGameType} onChange={this.onChange}>
                      <option value='CLASSIC'>CLASSIC</option>
                      <option value='RANDOM'>RANDOM</option>
                    </select>
                    {/* <br/> */}
                    <select style={styleSelect} name="selectGameLevel" value={this.state.selectGameLevel} onChange={this.onChange}>
                      <option value='EASY'>EASY</option>
                      <option value='NORMAL'>NORMAL</option>
                      <option value='HARD'>HARD</option>
                    </select>
                    <br/>
                    <input
                      style={styleInput}
                      name='inputRoomName'
                      value={this.state.inputRoomName}
                      placeholder="Room Name..."
                      onChange={this.onChange}
                      type="text"
                    />
                    <br/>
                   
                    <button onClick={this.cobaBikinRoom} className="btnnya-main linkStyle" id="new-game-button">Create Room</button>
                    <div id="toast"><div id="img"> <i className="material-icons">error</i></div><div id="desc">Please fill a room name..</div></div>
                  </form>

                </div>
              </div>
              <div className="row">
                
                { 
                  this.props.rooms.filter(room => room.players.length < 2)
                    .map((roomGame, i) => (
                        <RoomCard
                          history={this.props.history}
                          socket={this.props.socket}
                          data={roomGame}
                          key={i} />
                      ))
                }
              </div>              
            </div>
          </>
        }
        {
          !this.state.statusUserName
          &&
          <Redirect to='/' />
        }
        {
          !this.state.statusUserName && (
            <Redirect to='/' />
          )
        }
      </>
    )
  }
}

const styleInput = {
  width: 250,
  // marginTop: 290,
  // padding: '5px',
  paddingLeft: '10px',
  fontSize: '20px',
  marginRight: '10px',
  backgroundColor: '#ffffff',
  borderWidth: '2px',
  borderColor: 'green',
  color: '#434343',
  borderStyle: 'dashed',
  borderRadius: '15px',
  boxShadow: '1px 0px 5px rgba(16,16,66,0.75)',
  textShadow: '1px 1px 1px rgba(105, 53, 53, 0.75)',
  fontFamily: 'Finger Paint, cursive',
}

const styleSelect = {
  ...styleInput,
  width: '150px',
  fontFamily: 'Finger Paint, cursive',
  marginTop: '5px',
  marginBottom: '10px',
  display: 'inline-block'
}

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms
  };
}
export default connect(mapStateToProps)(Room)
