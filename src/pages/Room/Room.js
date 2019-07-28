import React, { Component } from 'react'
import IconUser from '../../image/frog-transparent-pixel-art-1.gif'
import RoomCard from './RoomCard'
import Loading from '../../component/Loading'
import { Redirect } from 'react-router-dom'

let listRoomListener = null
export class Room extends Component {
    state = {
        avail_rooms : [],
        playerAmount: 0,
        counter: 0,
        inputRoomName: '',
        playerName: '',
        statusUserName: true,
        statusCreateRoom: false
    }

    increment() {
        this.setState({
            counter : this.state.counter + 1
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
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
    }

    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    })

    cobaBikinRoom = (e) => {
      e.preventDefault();
      if (this.state.inputRoomName !== ''){
        this.props.socket.emit('joinRoom', {roomName: this.state.inputRoomName, playerName: 'naruto'}, function (val) {
          console.log('join ?', val)
        })
      }
    }

    componentDidMount() {
      listRoomListener = this.props.socket.on('listRoom', (value) => {
        console.log('roomnya', value)
        this.setState({
          avail_rooms: value
        })
      })
    }

    componentWillUnmount() {
      this.props.socket.removeListener('listRoom', listRoomListener)
    }
    
    joinRoom = (roomName) => {
        console.log('emit join-room ke trigger')
        this.props.socket.emit(`joinRoom`, roomName, 'naruto', function(value){
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
                avail_rooms : value
            })
        })
    }

    routerPushToHome(){
        this.setState({
            statusUserName: false
        })
    }

    cekUserName() {
        let userNameLogin = localStorage.getItem('htf_username')
        console.log(userNameLogin, " adalah ")
        if (userNameLogin) {
            this.setState({
                playerName: localStorage.getItem('htf_username')
            }) 
            this.availableListRoom()
        } else {
            this.routerPushToHome()
        }
    }

    componentDidMount() {
        console.log('componentDidMount jalan')
        console.log(this.props)
        this.cekUserName()
        // this.props.socket.emit('checkRooms', () => {
        // })

        // this.props.socket.on('checkPlayer', (value) => {
        //     console.log(value, " ini value")
        //     this.setState({
        //         playerAmount: value
        //     })
        // })
    }
    render() {
        return (
            <>
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
{/* 
                            {
                                this.state.avail_rooms.length > 0
                                &&
                                <> */}
                                    {
                                        this.state.avail_rooms.map((roomGame, i) => (
                                            <RoomCard
                                                
                                                data={ roomGame }
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
                    <Redirect to={ `/room/${this.state.inputRoomName}` } />
                }

            </>
        )
    }
}

const styleInput = {
    width:250,
    // marginTop: 290,
    padding : '5px',
    fontSize: '24px',
    marginRight: '10px',
    borderWidth: '2px',
    borderColor: 'green',
    backgroundColor: '#ffffff',
    color: '#434343',
    borderStyle: 'dashed',
    borderRadius: '15px',
    boxShadow: '1px 0px 5px rgba(16,16,66,0.75)',
    textShadow:  '1px 1px 1px rgba(105, 53, 53, 0.75)'
}

export default Room
