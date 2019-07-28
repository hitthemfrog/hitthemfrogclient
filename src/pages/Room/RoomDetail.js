import React, { Component } from 'react'
import IconUser from '../../image/frog-transparent-pixel-art-1.gif'

export class Room extends Component {
    state = {
        roomName: '',
        players: []
    }

    getPlayersInRoom() {
        this.props.socket.emit('getPlayersInROom', {roomname: this.props.match.params.roomname})
        this.props.socket.on('getPlayersInROom', (value) => {
            console.log('isinya', value)
            this.setState({
                players : value
            })
        })

    }

    componentDidMount() {
        // console.log(this.props)
        this.setState({
            roomName: this.props.match.params.roomname
        })
        this.getPlayersInRoom()
    }

    render() {
        return (
            <>
                <div className="force-overflow">
                </div>
                <div id="style-15" className="roomBox scrollbar force-overflow">
                {/* {JSON.stringify(this.props)} */}
                <h1>{this.state.roomName}</h1>
                    {/* <img data-testid="loadingImg" className="avatar" src={IconUser} alt="logo" /> */}
                    <h3>{ JSON.stringify(this.state.players)}</h3>
                    {/* <div className="row">
                    </div> */}
                </div>
            </>
        )
    }
}

export default Room
