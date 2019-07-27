import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Room.css';

export class RoomList extends Component {
    render() {
        return (
            <div className="col s12 m4">
                <div className="card blue-grey darken-1 hoverable">
                    <div className="card-content white-text">
                    {/* <span className="white-text">{JSON.stringify(this.props.data)}</span><br/> */}
                    <h3 className="white-text">{ this.props.data.name }</h3><br/>
                    <h6 className="white-text">{ this.props.data.status }</h6><br/>
                    {   
                        this.props.data.players.map((playerInRoom, i) => 
                            <span className="white-text" key={i}>{ playerInRoom.name }</span>
                        )
                    }
                    {/* <span className="white-text">{ this.props.data.players[0].playerName }</span><br/>
                    <span className="white-text">{ this.props.data.players[1].playerName }</span><br/> */}
                    </div>
                    <div className="card-action">
                    <Link to="/room/id">Join Room</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomList
