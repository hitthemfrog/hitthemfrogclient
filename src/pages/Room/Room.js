import React, { Component } from 'react'
import IconUser from '../../image/frog-transparent-pixel-art-1.gif'
import RoomCard from './RoomCard'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export class Room extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      avail_rooms: [],
      inputRoomName: '',
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
    let roomName = this.state.inputRoomName
    localStorage.setItem('htf_roomname', roomName)
    if (this.state.inputRoomName !== '') {
      let self = this
      this.props.socket.emit('joinRoom', { roomName, playerName: localStorage.getItem('htf_username') }, function (val) {
        if (val) {
          self.props.history.push('/waitingRoom')
        } else {
          /**
           * handle untuk error
           */
        }
      })
    }
  }

  componentDidMount() {
    this.props.socket.emit('checkRoom')
  }

  render() {
    return (
      <>
        {
          this.state.statusUserName && (
            <>
              <div id="style-15" className="roomBox scrollbar force-overflow">
                <div className='row'>
                  <div className='col s12 m6 l6'>
                    <img src={IconUser} alt="logo" />
                  </div>
                  <div className='col s12 m6 l6'>
                    <span className='playerNameStyle'>{this.state.playerName}</span>
                    <button onClick={() => this.userLogout()} className="btn">Exit</button>
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
                  {
                    this.props.rooms.map((roomGame, i) => (
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
          )
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

const mapStateToProps = (state) => {
  return {
    rooms: state.rooms
  };
}
export default connect(mapStateToProps)(Room)
