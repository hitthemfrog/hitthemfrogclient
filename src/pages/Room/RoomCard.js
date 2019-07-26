import React, { Component } from 'react'
import './Room.css';

export class RoomList extends Component {
    render() {
        return (
            <div className="col s12 m4">
                <div className="card-panel  grey darken-3 hoverable ">
                <span className="white-text">Player One</span><br/>
                <span className="white-text">Player Two</span><br/>
                </div>
            </div>
        )
    }
}

export default RoomList
