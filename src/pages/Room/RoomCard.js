import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Room.css';

export class RoomList extends Component {
    render() {
        return (
            <div className="col s12 m4">
                <div className="card blue-grey darken-1 hoverable">
                    <div className="card-content white-text">
                    <span className="white-text">Player One</span><br/>
                    <span className="white-text">Player Two</span><br/>
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
