import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Room.css';

export class RoomList extends Component {
  state = {
    redirectToRoomDetail: false
  }
  joinPlayerToRoom() {

  }

  render() {
    return (
      <div className="col s12 m3">
        <div className="card blue-grey darken-1 hoverable">
          <div className="card-content white-text">
            {/* <span className="white-text">{JSON.stringify(this.props.data)}</span><br/> */}
            <h3 className="white-text">{this.props.data.name}</h3><br />
            {
              this.props.data.players.map((playerInRoom, i) =>
                <>
                  <span className="white-text" key={i}>{playerInRoom.playerName}</span><br></br>
                </>
              )
            }
            <span className="white-text">{this.props.data.status} FOR YOU</span><br />
          </div>
          <div className="card-action">
            {
              (this.props.data.gameStatus === 'CREATED')
              &&
              <button onClick={() => { 
                let self = this
                localStorage.setItem('htf_roomname', this.props.data.name)
                this.props.socket.emit('joinRoom', { roomName: this.props.data.name, playerName: localStorage.getItem('htf_username') }, function (val) {
                  if (val) {
                    self.props.history.push('/waitingRoom')
                  } else {
                    /**
                     * handle untuk error
                     */
                  }
                })
              }}>Join Room</button>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default RoomList
