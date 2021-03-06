import React, { Component } from 'react'
import BackgroundPanel from '../../image/5a2b21aee7d055.0146630215127761109495.png'
import frogSound from '../../sound/frogsoundeffect.mp3'

import './Room.css';

export class RoomList extends Component {
  state = {
    redirectToRoomDetail: false
  }
  joinPlayerToRoom() {

  }

  render() {
    return (
      <div className="col s12 m3" >
       <div className="row">
        <div className="col s12 m12">
          <div className="card" style={panelStyle}>
            <div className="card-image hoverable">
              <img style={roomNameStyle} src={BackgroundPanel} alt="background_panel"/>
                <div className="centered">
                  <h4 className='roomNameStyle'>{this.props.data.name}<br/></h4>
                    {
                      (this.props.data.gameStatus === 'CREATED')
                      &&
                      <>
                      <button onClick={() => { 
                        let audioButton = new Audio();
                        audioButton.src = frogSound
                        audioButton.play()
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
                      }}
                      className="menu__link"
                      data-hover="Go">JOIN</button>
                      <br/>
                      <span className='gameLevelTypeStyle'>{this.props.data.gameType}, {this.props.data.gameLevel}</span>
                      </>
                    }
                    {
                      (this.props.data.gameStatus === 'STARTED')
                      &&
                      <>
                      <span className="menu__link" data-hover="Sorry">Playing</span>
                      </>
                    }
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

const panelStyle={
  borderTop: 'dashed',
  borderColor: '#FFC426',
  background:'rgba(0,0,0,.1)'
}

const roomNameStyle = {
  // marginTop: '-100px',
  marginTop:'5px',
  verticalAlign:'middle'
}

export default RoomList
