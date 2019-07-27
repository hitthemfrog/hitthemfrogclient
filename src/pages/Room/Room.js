import React, { Component } from 'react'
import IconUser from '../../image/frog-transparent-pixel-art-1.gif'
import RoomCard from './RoomCard'
import Loading from '../../component/Loading'

export class Room extends Component {
    state = {
        avail_rooms : [],
        playerAmount: 0,
        counter: 0,
        inputRoomName: ''
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
        if (this.state.inputRoomName === ''){
            console.log('nama room kosong mas')

        } else {
            console.log('nama room nya', this.state.inputRoomName)
            this.props.socket.emit('createRooms', {roomName: this.state.inputRoomName, player: 'naruto'})
            this.props.socket.on('createRooms', (value) => {
                console.log('roomnya', value)
                this.setState({
                    avail_rooms : value
                })
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevState.playerAmount !== this.state.playerAmount) {
        //   this.props.socket.emit('checkPlayer');
        // }
    }
    joinRoom = (roomName) => {
        console.log('emit join-room ke trigger')
        this.props.socket.emit(`join-room`, roomName,function(value){
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

    componentDidMount() {
        console.log('componentDidMount jalan')
        // this.listAvailableRoom()
        // console.log(this.props.socket)

        // this.props.socket.on('checkRooms', (value) => {
        //     console.log('roomnya', value)
        //     this.setState({
        //         avail_rooms: value
        //     })
        // })

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
