import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Home.css';

export class HomePage extends Component {
    render() {
        return (
            // <div className="row">
                <div className="startGameStyle col s12 m12 l12">
                    <h1>HitThatFrogs</h1>
                    <div>
                        <Link  to="/room" className="btn-main linkStyle" id="new-game-button">New Game</Link>
                        {/* <button className="linkStyle"><Link className="btn-main"  to="/room">START</Link></button> */}
                    </div>
                </div>
            // </div>
        )
    }
}

export default HomePage
