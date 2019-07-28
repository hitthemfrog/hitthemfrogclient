import React, { Component } from 'react'
import IconUser from '../../image/frog-transparent-pixel-art-1.gif'
// import IconUser from '../../image/htflogo.jpg'

import RoomCard from './RoomCard'
import Loading from '../../component/Loading'
import { Redirect } from 'react-router-dom'
import soundfile from '../../sound/sountrack.mp3'
import IconRoom from '../../image/man.png'

let listRoomListener = null
export class Room extends Component {
  state = {
    avail_rooms: [],
    playerAmount: 0,
    counter: 0,
    inputRoomName: '',
    playerName: '',
    statusUserName: true,
    statusCreateRoom: false
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
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
    let roomName = this.state.inputRoomName
    localStorage.setItem('htf_roomname', roomName)
    if (this.state.inputRoomName !== '') {
      let self = this
      this.props.socket.emit('joinRoom', { roomName, playerName: localStorage.getItem('htf_username') }, function (val) {
        if (val) {
          // self.props.history.push('/waitingRoom')
        } else {
          /**
           * handle untuk error
           */
        }
      })
    }
  }

  componentDidMount() {
    console.log('room componentDidMount')
    if (localStorage.getItem('htf_username')){
      console.log('masuk if')
      this.setState({
        playerName: localStorage.getItem('htf_username')
      })
      listRoomListener = this.props.socket.on('listRoom', (value) => {
        this.setState({
          avail_rooms: value,
        })
        console.log('roomnya', value)
      })
      this.props.socket.emit('checkRoom')
    } else {
      this.props.history.push('/')
    }
  }

  componentWillUnmount() {
    this.props.socket.removeListener('listRoom', listRoomListener)
  }

  joinRoom = (roomName) => {
    console.log('emit join-room ke trigger')
    this.props.socket.emit(`joinRoom`, roomName, 'naruto', function (value) {
      if (value) {
        this.props.socket.emit('checkBeforeEnter', roomName);
        this.props.history.push('/main');
      } else {
        console.log('maap, uda penuh bang');
      }
    });
    // setRoom('Room 1');
  };

  availableListRoom() {
    console.log('list room trigger')
    this.props.socket.emit('listRooms')
    this.props.socket.on('listRooms', (value) => {
      console.log('roomnya', value)
      this.setState({
        avail_rooms: value
      })
    })
  }

  routerPushToHome() {
    this.setState({
      statusUserName: false
    })
  }

  cekUserName() {
    let userNameLogin = localStorage.getItem('htf_username')
    console.log(userNameLogin, " adalah ")
    if (userNameLogin) {
      console.log('masuK IF,', userNameLogin)
      this.setState({
        playerName: localStorage.getItem('htf_username')
      })
      this.availableListRoom()
    } else {
      this.routerPushToHome()
    }
  }

  render() {
    return (
      <>
        {
            <div>
                <audio src={soundfile} autoPlay/>
                <button onClick={() => this.userLogout()} className="red accent-4 waves-effect waves-light btn large right"><i class="material-icons right">exit_to_app</i>Exit</button>
            </div>
        }
        {
          this.state.statusUserName
          &&
          <>
            <div className="force-overflow">
              {/* <Loading></Loading> */}
              {/* <button onClick={() => this.cobaBikinRoom()}>TES CREATE ROOM</button> */}
              {/* <button onClick={() => this.joinRoom()}>TES JOIN ROOM</button> */}
            </div>
            <div id="style-15" className="roomBox scrollbar force-overflow">
              <div className='row'>
                <div className='col s12 m6 l6'>
                  <img src={IconUser} alt="logo" />
                </div>
                <div className='col s12 m6 l6'>
                  <span className='playerNameStyle'>Welcome, {this.state.playerName}</span>
                  <form onSubmit={this.cobaBikinRoom}>
                    <input
                      style={styleInput}
                      name='inputRoomName'
                      value={this.state.inputRoomName}
                      placeholder=" Type here..."
                      onChange={this.onChange}
                      type="text"
                    />
                    <button onClick={this.cobaBikinRoom} className="btnnya-main linkStyle" id="new-game-button">Create Room</button>
                    <div id="toast"><div id="img"> <i className="material-icons">error</i></div><div id="desc">Please fill a room name..</div></div>
                  </form>

                </div>
              </div>
              <div className="row">
              
                {/* 
                            {
                                this.state.avail_rooms.length > 0
                                &&
                                <> */}
                {
                  this.state.avail_rooms.map((roomGame, i) => (
                    <RoomCard
                      history={this.props.history}
                      socket={this.props.socket}
                      data={roomGame}
                      key={i} />
                  ))
                }
                {/* </>
                            }                         */}
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
          this.state.statusCreateRoom
          &&
          <Redirect to={`/room/${this.state.inputRoomName}`} />
        }
      </>
    )
  }
}

const styleInput = {
  width: 250,
  // marginTop: 290,
  padding: '5px',
  fontSize: '24px',
  marginRight: '10px',
  borderWidth: '2px',
  borderColor: 'green',
  backgroundColor: '#ffffff',
  color: '#434343',
  borderStyle: 'dashed',
  borderRadius: '15px',
  boxShadow: '1px 0px 5px rgba(16,16,66,0.75)',
  textShadow: '1px 1px 1px rgba(105, 53, 53, 0.75)'
}

export default Room
