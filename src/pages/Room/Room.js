import React, { Component } from 'react'
import IconUser from '../../image/frog-transparent-pixel-art-1.gif'
import RoomCard from './RoomCard'
import Loading from '../../component/Loading'

let listRoomListener = null
export class Room extends Component {
    state = {
        avail_rooms : [],
        playerAmount: 0,
        counter: 0,
        inputRoomName: '', 
    }

    increment() {
        this.setState({
            counter : this.state.counter + 1
        })
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

    listAvailableRoom() {
        
    }

    render() {
        return (
            <>
                <div className="force-overflow">
                {/* <Loading></Loading> */}
                    <button onClick={() => this.cobaBikinRoom()}>TES CREATE ROOM</button>
                    <button onClick={() => this.joinRoom()}>TES JOIN ROOM</button>
                </div>
                <div id="style-15" className="roomBox scrollbar force-overflow">
                    <img data-testid="loadingImg" className="avatar" src={IconUser} alt="logo" />
                    {/* <h1>ROOM LIST</h1> */}
                    <form onSubmit={this.cobaBikinRoom}>
                        <label>
                            Name:
                            <input
                                name='inputRoomName'
                                value={this.state.inputRoomName}
                                onChange={this.onChange}
                                type="text"
                            />
                        </label>
                        <input type="submit" value="Create Room" />
                    </form>
                    <div className="row">
                    {/* { JSON.stringify(this.state.playerAmount)} */}
                        {
                            this.state.avail_rooms.length <= 0 &&  <Loading />
                        }

                        {
                            this.state.avail_rooms.length > 0
                            &&
                            <>
                                {
                                    this.state.avail_rooms.map((roomGame, i) => (
                                        <RoomCard
                                            data={ roomGame }
                                            key={i} />
                                    ))
                                }
                            </>
                        }


                    {/* {JSON.stringify(this.state.frog_rooms)} */}
                        
                    </div>
                </div>
            </>
        )
    }
}

export default Room
